<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subscription_id',
        'amount_subtotal',
        'tax_amount',
        'discount_amount',
        'amount_total',
        'currency',
        'status',
        'pdf_path',
        'provider',
        'provider_invoice_id',
        'issued_at',
    ];

    protected $casts = [
        'issued_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function markAsPaid(?\DateTimeInterface $paidAt = null): void
    {
        $this->status = 'paid';
        $this->save();
    }

    public function markAsFailed(?\DateTimeInterface $failedAt = null): void
    {
        $this->status = 'failed';
        $this->save();
    }
}
