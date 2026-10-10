CREATE TABLE public.portfolio_ai_state (
 id text PRIMARY KEY,
 paused boolean NOT NULL DEFAULT false,
 status integer,
 message text,
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.portfolio_ai_state TO service_role;
ALTER TABLE public.portfolio_ai_state ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.portfolio_ai_usage (
 visitor_hash text PRIMARY KEY,
 window_start timestamptz NOT NULL DEFAULT now(),
 requests integer NOT NULL DEFAULT 1
);
GRANT ALL ON public.portfolio_ai_usage TO service_role;
ALTER TABLE public.portfolio_ai_usage ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.consume_portfolio_ai_request(visitor text) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE hits integer;
BEGIN
 INSERT INTO public.portfolio_ai_usage(visitor_hash) VALUES (visitor)
 ON CONFLICT (visitor_hash) DO UPDATE SET
 requests = CASE WHEN portfolio_ai_usage.window_start < now() - interval '1 hour' THEN 1 ELSE portfolio_ai_usage.requests + 1 END,
 window_start = CASE WHEN portfolio_ai_usage.window_start < now() - interval '1 hour' THEN now() ELSE portfolio_ai_usage.window_start END
 RETURNING requests INTO hits;
 RETURN hits <= 10;
END;
$$;
REVOKE ALL ON FUNCTION public.consume_portfolio_ai_request(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_portfolio_ai_request(text) TO service_role;