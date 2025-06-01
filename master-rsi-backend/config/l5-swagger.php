<?php
return [
    'api' => [
        'title' => 'Master RSI API Documentation',
    ],
    'routes' => [
        'api' => 'api/documentation',
        'docs' => 'docs',
    ],
    'paths' => [
        'docs' => storage_path('api-docs'),
        'annotations' => [
            base_path('app'),
            base_path('app/Http'),
            base_path('app/Schemas'),
        ],
        'exclude' => [
            // Add any directories to exclude
        ],
    ],
];
