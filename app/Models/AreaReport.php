<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\AreaReport
 *
 * @property int $id
 * @property int $user_id
 * @property string $area_name
 * @property string $description
 * @property string $details
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string|null $location_address
 * @property array|null $attachments
 * @property string $status
 * @property \Illuminate\Support\Carbon $reported_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport query()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereAreaName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereAttachments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereLocationAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereReportedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport byStatus($status)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport byDateRange($startDate, $endDate)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaReport byUser($userId)
 * @method static \Database\Factories\AreaReportFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AreaReport extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'area_name',
        'description',
        'details',
        'latitude',
        'longitude',
        'location_address',
        'attachments',
        'status',
        'reported_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'attachments' => 'array',
        'reported_at' => 'datetime',
    ];

    /**
     * Get the user that owns the area report.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to filter reports by status.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to filter reports by date range.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $startDate
     * @param  string  $endDate
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('reported_at', [$startDate, $endDate]);
    }

    /**
     * Scope a query to filter reports by user.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}