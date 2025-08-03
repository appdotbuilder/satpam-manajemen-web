<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAreaReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isUser();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'area_name' => 'required|string|max:255',
            'description' => 'required|string',
            'details' => 'required|string',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'location_address' => 'nullable|string',
            'attachments.*' => 'file|mimes:jpg,jpeg,png,gif,mp4,mov,avi|max:10240', // max 10MB
            'attachments' => 'array|max:2',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'area_name.required' => 'Nama area wajib diisi.',
            'description.required' => 'Keterangan wajib diisi.',
            'details.required' => 'Detail laporan wajib diisi.',
            'latitude.between' => 'Latitude harus antara -90 dan 90.',
            'longitude.between' => 'Longitude harus antara -180 dan 180.',
            'attachments.*.file' => 'File attachment tidak valid.',
            'attachments.*.mimes' => 'File attachment harus berformat jpg, jpeg, png, gif, mp4, mov, atau avi.',
            'attachments.*.max' => 'Ukuran file attachment maksimal 10MB.',
            'attachments.max' => 'Maksimal 2 file attachment.',
        ];
    }
}