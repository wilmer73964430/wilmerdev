<?php

return [
    'benefits' => [
        [
            'title' => 'Cobros automatizados',
            'description' => 'Sincroniza renovaciones y reintentos automáticos con tus pasarelas favoritas.',
            'icon' => 'ri-flashlight-fill',
        ],
        [
            'title' => 'Facturación fiscal',
            'description' => 'Genera comprobantes PDF con impuestos configurables y numeración personalizada.',
            'icon' => 'ri-bill-fill',
        ],
        [
            'title' => 'Analíticas en tiempo real',
            'description' => 'MRR, churn y LTV con comparativas por período y moneda.',
            'icon' => 'ri-pulse-line',
        ],
    ],
    'features' => [
        [
            'title' => 'Panel admin impulsado por Livewire',
            'description' => 'Tablas y filtros dinámicos, exportación CSV y acciones masivas.',
        ],
        [
            'title' => 'Soporte multi-pasarela',
            'description' => 'Stripe, PayPal, Mercado Pago e Izipay bajo una interfaz consistente.',
        ],
        [
            'title' => 'Experiencia verde futurista',
            'description' => 'Interfaz oscura con acentos #00E676 y micro-animaciones suaves.',
        ],
    ],
    'testimonials' => [
        [
            'name' => 'Laura Mendoza',
            'role' => 'CEO, AndinaCloud',
            'quote' => 'Neon Subs nos permitió lanzar suscripciones en 2 semanas con métricas listas para inversionistas.'
        ],
        [
            'name' => 'Jorge Quispe',
            'role' => 'CTO, LimaPay',
            'quote' => 'La integración con Izipay fue directa y las facturas cumplen con nuestros requisitos fiscales.'
        ],
    ],
    'pricing' => [
        'monthly' => [
            [
                'name' => 'Básico',
                'price' => 29,
                'currency' => 'USD',
                'features' => ['100 clientes', '1 pasarela', 'Soporte estándar'],
                'badge' => null,
            ],
            [
                'name' => 'Pro',
                'price' => 79,
                'currency' => 'USD',
                'features' => ['1,000 clientes', '4 pasarelas', 'Soporte prioritario'],
                'badge' => 'Más popular',
            ],
            [
                'name' => 'Enterprise',
                'price' => 149,
                'currency' => 'USD',
                'features' => ['Clientes ilimitados', 'API avanzada', 'Soporte dedicado'],
                'badge' => 'Empresas',
            ],
        ],
        'yearly' => [],
    ],
    'faqs' => [
        [
            'question' => '¿Puedo usar múltiples monedas?',
            'answer' => 'Sí, el admin permite habilitar USD y PEN (Perú) y añadir más monedas según tus necesidades.'
        ],
        [
            'question' => '¿Qué métodos de pago soporta?',
            'answer' => 'Stripe, PayPal, Mercado Pago e Izipay con webhooks automáticos e idempotentes.'
        ],
        [
            'question' => '¿Ofrecen prueba gratuita?',
            'answer' => 'Sí, puedes configurar días de prueba por plan y aplicar cupones para campañas promocionales.'
        ],
    ],
];
