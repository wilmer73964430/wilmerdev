<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="bg-[#0A0F0D] text-[#E6FFE6]">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? config('app.name', 'Neon Subs') }}</title>
    <meta name="description" content="SaaS de suscripciones futurista compatible con Stripe, PayPal, Mercado Pago e Izipay.">
    <meta property="og:title" content="Neon Subs">
    <meta property="og:description" content="Automatiza cobros y suscripciones en un panel verde futurista.">
    <meta property="og:image" content="{{ asset('images/og-neon.png') }}">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen antialiased">
    <div id="app" class="flex min-h-screen flex-col">
        <header class="border-b border-[#00E676]/20 bg-black/20 backdrop-blur">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                <a href="/" class="flex items-center gap-2 focus-ring">
                    <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#00E676]/20 text-[#00E676] font-bold">N</span>
                    <span class="text-xl font-bold tracking-wide">Neon Subs</span>
                </a>
                <nav class="hidden items-center gap-6 text-sm font-medium md:flex">
                    <a href="{{ route('landing') }}" class="hover:text-[#00FFD1] focus-ring">Inicio</a>
                    <a href="{{ route('pricing') }}" class="hover:text-[#00FFD1] focus-ring">Precios</a>
                    <a href="{{ route('features') }}" class="hover:text-[#00FFD1] focus-ring">Características</a>
                    <a href="{{ route('faq') }}" class="hover:text-[#00FFD1] focus-ring">FAQ</a>
                    <a href="{{ route('blog.index') }}" class="hover:text-[#00FFD1] focus-ring">Blog</a>
                </nav>
                <div class="flex items-center gap-3">
                    @auth
                        <a href="{{ route('user.dashboard') }}" class="btn-outline focus-ring text-sm">Panel</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm hover:text-[#00FFD1] focus-ring">Ingresar</a>
                        <a href="{{ route('register') }}" class="btn-primary text-sm focus-ring">Crear cuenta</a>
                    @endauth
                </div>
            </div>
        </header>

        <main class="flex-1">
            {{ $slot }}
        </main>

        <footer class="border-t border-[#00E676]/20 bg-black/40 py-10">
            <div class="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
                <div>
                    <div class="mb-3 text-2xl font-bold text-[#00E676]">Neon Subs</div>
                    <p class="text-sm text-[#A3F7B5]">Automatiza tus ingresos recurrentes y lleva tu SaaS al siguiente nivel.</p>
                </div>
                <div>
                    <h3 class="mb-2 font-semibold text-[#00FFD1]">Empresa</h3>
                    <ul class="space-y-2 text-sm text-[#A3F7B5]">
                        <li><a href="{{ route('legal.terms') }}" class="hover:text-[#00FFD1] focus-ring">Términos</a></li>
                        <li><a href="{{ route('legal.privacy') }}" class="hover:text-[#00FFD1] focus-ring">Privacidad</a></li>
                        <li><a href="mailto:hello@neon-subs.test" class="hover:text-[#00FFD1] focus-ring">Contacto</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="mb-2 font-semibold text-[#00FFD1]">Recursos</h3>
                    <ul class="space-y-2 text-sm text-[#A3F7B5]">
                        <li><a href="#" class="hover:text-[#00FFD1] focus-ring">Centro de ayuda</a></li>
                        <li><a href="#" class="hover:text-[#00FFD1] focus-ring">Status</a></li>
                        <li><a href="#" class="hover:text-[#00FFD1] focus-ring">API Docs</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="mb-2 font-semibold text-[#00FFD1]">Síguenos</h3>
                    <div class="flex gap-3 text-[#A3F7B5]">
                        <a href="#" aria-label="Twitter" class="focus-ring hover:text-[#00FFD1]"><i class="ri-twitter-fill text-2xl"></i></a>
                        <a href="#" aria-label="LinkedIn" class="focus-ring hover:text-[#00FFD1]"><i class="ri-linkedin-fill text-2xl"></i></a>
                        <a href="#" aria-label="YouTube" class="focus-ring hover:text-[#00FFD1]"><i class="ri-youtube-fill text-2xl"></i></a>
                    </div>
                </div>
            </div>
            <p class="mt-10 text-center text-xs text-[#A3F7B5]">© {{ date('Y') }} Neon Subs. Todos los derechos reservados.</p>
        </footer>
    </div>
</body>
</html>
