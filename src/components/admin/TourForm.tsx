"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  Upload,
  X,
  Plus,
  Trash2,
  MapPin,
  Calendar,
} from "lucide-react";
import { Tour } from "@/types";

// -------------------- Complete Schema --------------------
const locationSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
  address: z.string().min(1, "Address is required"),
  description: z.string().min(1, "Description is required"),
  day: z.number().optional(),
});

const startLocationSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
  address: z.string().min(1, "Address is required"),
  description: z.string().min(1, "Description is required"),
});

const guideSchema = z.string(); // Guide ID

const tourFormSchema = z.object({
  // Basic info
  name: z
    .string()
    .min(10, "Name must be at least 10 characters")
    .max(40, "Name cannot exceed 40 characters"),
  duration: z
    .number()
    .min(1, "Duration must be at least 1 day")
    .max(30, "Duration cannot exceed 30 days"),
  maxGroupSize: z
    .number()
    .min(1, "Group size must be at least 1")
    .max(50, "Group size cannot exceed 50"),
  difficulty: z.enum(["easy", "medium", "difficult"]),
  price: z.number().min(0, "Price must be positive"),
  priceDiscount: z.number().optional(),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),

  // Start Location
  startLocation: startLocationSchema,

  // Locations array
  locations: z.array(locationSchema).default([]),

  // Guides array (guide IDs)
  guides: z.array(guideSchema).default([]),

  // Start Dates
  startDates: z.array(z.string()).default([]),
});

type TourFormValues = z.infer<typeof tourFormSchema>;

interface TourFormProps {
  initialData?: Tour;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  availableGuides?: Array<{ _id: string; name: string; photo: string }>;
}

// -------------------- Component --------------------
export function TourForm({
  initialData,
  onSubmit,
  isSubmitting,
  availableGuides = [],
}: TourFormProps) {
  const navigate = useNavigate();

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState(
    initialData?.imageCover || "",
  );
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    initialData?.images || [],
  );
  const [error, setError] = useState("");

  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          duration: initialData.duration,
          maxGroupSize: initialData.maxGroupSize,
          difficulty: initialData.difficulty,
          price: initialData.price,
          priceDiscount: initialData.priceDiscount,
          summary: initialData.summary,
          description: initialData.description,
          startLocation: initialData.startLocation,
          locations: initialData.locations || [],
          guides:
            initialData.guides?.map((g) =>
              typeof g === "string" ? g : g._id,
            ) || [],
          startDates:
            initialData.startDates?.map(
              (d) => new Date(d).toISOString().split("T")[0],
            ) || [],
        }
      : {
          name: "",
          duration: 1,
          maxGroupSize: 10,
          difficulty: "easy",
          price: 0,
          priceDiscount: 0,
          summary: "",
          description: "",
          startLocation: {
            type: "Point",
            coordinates: [0, 0],
            address: "",
            description: "",
          },
          locations: [],
          guides: [],
          startDates: [],
        },
  });

  // Field arrays for dynamic fields
  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control: form.control,
    name: "locations",
  });

  const {
    fields: dateFields,
    append: appendDate,
    remove: removeDate,
  } = useFieldArray({
    control: form.control,
    name: "startDates",
  });

  // Image Handlers
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryImages([...galleryImages, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews([...galleryPreviews, ...previews]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async (values: TourFormValues) => {
    setError("");
    const formData = new FormData();

    // Basic fields
    formData.append("name", values.name);
    formData.append("duration", values.duration.toString());
    formData.append("maxGroupSize", values.maxGroupSize.toString());
    formData.append("difficulty", values.difficulty);
    formData.append("price", values.price.toString());
    if (values.priceDiscount)
      formData.append("priceDiscount", values.priceDiscount.toString());
    formData.append("summary", values.summary);
    formData.append("description", values.description);

    // Start Location
    formData.append("startLocation", JSON.stringify(values.startLocation));

    // Locations array
    formData.append("locations", JSON.stringify(values.locations));

    // Guides array
    values.guides.forEach((guideId) => {
      formData.append("guides", guideId);
    });

    // Start Dates
    values.startDates.forEach((date) => {
      formData.append("startDates", new Date(date).toISOString());
    });

    // Images
    if (coverImage) formData.append("imageCover", coverImage);
    galleryImages.forEach((img) => formData.append("images", img));

    await onSubmit(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      {/* ERROR */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* COVER IMAGE */}
      <div className="space-y-4">
        <FieldLabel>Cover Image</FieldLabel>
        <div className="flex items-center gap-4">
          {coverPreview && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden">
              <img src={coverPreview} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null);
                  setCoverPreview("");
                }}
                className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <label className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 border rounded-md">
              <Upload className="h-4 w-4" />
              <span>{coverPreview ? "Change Image" : "Upload Image"}</span>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleCoverImageChange}
            />
          </label>
        </div>
      </div>

      {/* BASIC INFO GRID */}
      <FieldGroup className="grid md:grid-cols-2 gap-6">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Tour Name *</FieldLabel>
              <Input {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="duration"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Duration (days) *</FieldLabel>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="maxGroupSize"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Max Group Size *</FieldLabel>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="difficulty"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Difficulty *</FieldLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="difficult">Difficult</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Price ($) *</FieldLabel>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="priceDiscount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Discount Price ($)</FieldLabel>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              <FieldDescription>
                Must be less than regular price
              </FieldDescription>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* SUMMARY & DESCRIPTION */}
      <Controller
        name="summary"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Summary *</FieldLabel>
            <Textarea {...field} rows={2} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Description *</FieldLabel>
            <Textarea {...field} rows={6} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* START LOCATION */}
      <div className="space-y-4 border rounded-lg p-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Start Location</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="startLocation.address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Address *</FieldLabel>
                <Input {...field} placeholder="123 Adventure St, City" />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="startLocation.description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Description *</FieldLabel>
                <Input {...field} placeholder="Tour starting point" />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="startLocation.coordinates.0"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Longitude *</FieldLabel>
                <Input
                  type="number"
                  step="any"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="startLocation.coordinates.1"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Latitude *</FieldLabel>
                <Input
                  type="number"
                  step="any"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </div>

      {/* LOCATIONS (Itinerary) */}
      <div className="space-y-4 border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <h3 className="text-lg font-semibold">
              Tour Locations (Itinerary)
            </h3>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              appendLocation({
                type: "Point",
                coordinates: [0, 0],
                address: "",
                description: "",
                day: locationFields.length + 1,
              })
            }
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Location
          </Button>
        </div>

        {locationFields.map((field, index) => (
          <div key={field.id} className="border-t pt-4 relative">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-0"
              onClick={() => removeLocation(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Controller
                name={`locations.${index}.day`}
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Day</FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </Field>
                )}
              />

              <Controller
                name={`locations.${index}.address`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Address *</FieldLabel>
                    <Input {...field} />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name={`locations.${index}.description`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Description *</FieldLabel>
                    <Input {...field} />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name={`locations.${index}.coordinates.0`}
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Longitude</FieldLabel>
                    <Input
                      type="number"
                      step="any"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </Field>
                )}
              />

              <Controller
                name={`locations.${index}.coordinates.1`}
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Latitude</FieldLabel>
                    <Input
                      type="number"
                      step="any"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </Field>
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {/* GUIDES */}
      <div className="space-y-4 border rounded-lg p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Tour Guides</h3>
        </div>

        <Controller
          name="guides"
          control={form.control}
          render={({ field }) => (
            <Field>
              <Select
                onValueChange={(value) => {
                  if (!field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a guide" />
                </SelectTrigger>
                <SelectContent>
                  {availableGuides.map((guide) => (
                    <SelectItem key={guide._id} value={guide._id}>
                      {guide.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <div className="flex flex-wrap gap-2">
          {form.watch("guides").map((guideId, index) => {
            const guide = availableGuides.find((g) => g._id === guideId);
            return (
              <div
                key={guideId}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
              >
                <span className="text-sm">{guide?.name || guideId}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newGuides = [...form.getValues("guides")];
                    newGuides.splice(index, 1);
                    form.setValue("guides", newGuides);
                  }}
                  className="text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* START DATES */}
      <div className="space-y-4 border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Start Dates</h3>
          </div>
          <Button type="button" size="sm" onClick={() => appendDate("")}>
            <Plus className="h-4 w-4 mr-1" />
            Add Date
          </Button>
        </div>

        {dateFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <Controller
              name={`startDates.${index}`}
              control={form.control}
              render={({ field }) => (
                <Input type="date" {...field} className="flex-1" />
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeDate(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      {/* GALLERY IMAGES */}
      <div className="space-y-4">
        <FieldLabel>Gallery Images</FieldLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryPreviews.map((preview, index) => (
            <div
              key={index}
              className="relative h-24 rounded-lg overflow-hidden"
            >
              <img src={preview} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <label className="cursor-pointer border-2 border-dashed rounded-lg flex items-center justify-center h-24 hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            <span className="text-sm">Add Images</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleGalleryChange}
            />
          </label>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/tours")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Tour"
              : "Create Tour"}
        </Button>
      </div>
    </form>
  );
}
