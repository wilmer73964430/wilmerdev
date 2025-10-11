<?php

if (! function_exists('money_format_locale')) {
    function money_format_locale(float $amount, string $currency, string $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();
        if (class_exists(\NumberFormatter::class)) {
            $formatter = new \NumberFormatter($locale, \NumberFormatter::CURRENCY);

            return $formatter->formatCurrency($amount, $currency);
        }

        return number_format($amount, 2).' '.$currency;
    }
}
