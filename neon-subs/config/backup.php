<?php

return [
    'backup' => [
        'name' => env('APP_NAME', 'neon-subs'),
        'source' => [
            'files' => [
                'include' => [base_path()],
                'exclude' => [base_path('vendor'), base_path('node_modules')],
            ],
            'databases' => ['mysql'],
        ],
        'destination' => [
            'disks' => ['local'],
        ],
    ],
];
