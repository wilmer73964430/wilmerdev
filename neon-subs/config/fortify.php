<?php

return [
    'guard' => 'web',
    'passwords' => 'users',
    'username' => 'email',
    'email' => 'email',
    'features' => [
        Laravel\Fortify\Features::registration(),
        Laravel\Fortify\Features::resetPasswords(),
        Laravel\Fortify\Features::emailVerification(),
        Laravel\Fortify\Features::twoFactorAuthentication([
            'confirmPassword' => true,
        ]),
    ],
];
