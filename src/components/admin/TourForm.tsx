import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TourFormData, tourSchema } from "@/schemas/tourSchema";
import { Guide, Tour } from "@/types";
import {
  AlertCircle,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import MapPicker from "./LocationPicker";
import LocationMapPicker from "./LocationPicker";
import { toursAPI } from "@/api/tours";

interface TourFormProps {
  initialData?: Tour;
  availableGuides?: Guide[];
  onSuccess?: () => void;
}

// -------------------- Component --------------------
export function TourForm({
  initialData,
  availableGuides = [],
  onSuccess,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [localStartDates, setLocalStartDates] = useState<string[]>(
    initialData?.startDates
      ?.map((d) => new Date(d).toISOString().split("T")[0])
      .filter((d): d is string => d !== undefined) || [],
  );

  const [error, setError] = useState("");

  const form = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),

    defaultValues: initialData
      ? {
          name: initialData.name,
          duration: initialData.duration,
          maxGroupSize: initialData.maxGroupSize,
          difficulty: initialData.difficulty,

          ratingAverage: initialData.ratingAverage,
          ratingQuantity: initialData.ratingQuantity,

          price: initialData.price,
          priceDiscount: initialData.priceDiscount,

          summary: initialData.summary,

          description: initialData.description,
          imageCover: initialData.imageCover,

          images: initialData.images,

          startDates: initialData.startDates,

          startLocation: initialData.startLocation,

          locations: initialData.locations,

          guides:
            initialData?.guides?.map((guide) =>
              typeof guide === "string" ? guide : guide._id,
            ) || [],
        }
      : {
          name: "",
          duration: 1,
          maxGroupSize: 1,
          difficulty: "easy",

          ratingAverage: undefined,
          ratingQuantity: undefined,

          price: 0,
          priceDiscount: undefined,

          summary: "",

          description: "",
          imageCover: "",

          images: [],

          startDates: [],

          startLocation: {
            type: "Point",
            coordinates: [0, 0] as [number, number],
            description: "",
            address: "",
          },

          locations: [],

          guides: [],
        },
  });

  // Field arrays for dynamic fields
  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray<TourFormData>({
    control: form.control,
    name: "locations",
  });

  const addStartDate = () => {
    setLocalStartDates([...localStartDates, ""]);
  };

  const updateStartDate = (index: number, value: string) => {
    const newDates = [...localStartDates];
    newDates[index] = value;
    setLocalStartDates(newDates);
    // Also update form value
    form.setValue(
      "startDates",
      newDates.map((d) => new Date(d).toISOString()),
    );
  };

  const removeStartDate = (index: number) => {
    const newDates = localStartDates.filter((_, i) => i !== index);
    setLocalStartDates(newDates);
    form.setValue(
      "startDates",
      newDates.map((d) => new Date(d).toISOString()),
    );
  };

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
  const handleSubmit = async (data: TourFormData) => {
    try {
      setError("");
      setIsSubmitting(true);

      // Create/Update tour WITHOUT images (JSON data)
      const tourData = {
        name: data.name,
        duration: Number(data.duration),
        maxGroupSize: Number(data.maxGroupSize),
        difficulty: data.difficulty,
        price: Number(data.price),
        priceDiscount: data.priceDiscount
          ? Number(data.priceDiscount)
          : undefined,
        summary: data.summary,
        description: data.description,
        startLocation: data.startLocation,
        locations: data.locations,
        guides: data.guides,
        startDates: data.startDates,
      };

      let tourId = initialData?._id;

      if (initialData) {
        // Update tour data
        await toursAPI.updateTour(tourId as string, tourData);
      } else {
        // Create new tour
        const response = await toursAPI.createTour(tourData);
        tourId = response.data._id;
      }

      // 2️⃣ Second: Upload images if any
      if (coverImage || galleryImages.length > 0) {
        const imageFormData = new FormData();
        if (coverImage) imageFormData.append("imageCover", coverImage);
        galleryImages.forEach((file) => imageFormData.append("images", file));

        await toursAPI.uploadImages(tourId as string, imageFormData);
      }

      navigate("/admin/tours");
      onSuccess?.();
    } catch (error: any) {
      console.error("Submit error:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit, (errors) => {
        console.log(errors);
      })}
      className="space-y-8"
    >
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
            <FieldLabel>Summary </FieldLabel>
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

        {/* ADDRESS + DESCRIPTION */}
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
        </div>

        {/* ================= MAP PICKER ================= */}
        <div className="space-y-2">
          <FieldLabel>Pick Location on Map *</FieldLabel>

          <MapPicker
            value={
              (form.watch("startLocation.coordinates") as [number, number]) || [
                90.4125, 23.8103,
              ]
            }
            onChange={(coords) => {
              form.setValue("startLocation.coordinates", coords, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        </div>

        {/* ================= MANUAL INPUTS (FALLBACK) ================= */}
        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="startLocation.coordinates.0"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Longitude *</FieldLabel>
                <Input
                  type="number"
                  step="any"
                  value={field.value}
                  onChange={(e) => {
                    const lng = parseFloat(e.target.value || "0");
                    const lat =
                      form.getValues("startLocation.coordinates.1") || 0;

                    field.onChange(lng);
                    form.setValue("startLocation.coordinates", [lng, lat]);
                  }}
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
                  value={field.value}
                  onChange={(e) => {
                    const lat = parseFloat(e.target.value || "0");
                    const lng =
                      form.getValues("startLocation.coordinates.0") || 0;

                    field.onChange(lat);
                    form.setValue("startLocation.coordinates", [lng, lat]);
                  }}
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

        {locationFields.map((field, index) => {
          const coords = form.watch(`locations.${index}.coordinates`) as [
            number,
            number,
          ];

          return (
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
                {/* DAY */}
                <Controller
                  name={`locations.${index}.day`}
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Day</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </Field>
                  )}
                />

                {/* ADDRESS */}
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

                {/* DESCRIPTION */}
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

                {/* ================= MAP ================= */}
                <div className="col-span-2 space-y-2">
                  <FieldLabel>Pick Location on Map</FieldLabel>

                  <LocationMapPicker
                    value={coords || [90.4125, 23.8103]}
                    onChange={(newCoords) => {
                      form.setValue(
                        `locations.${index}.coordinates`,
                        newCoords,
                        {
                          shouldDirty: true,
                          shouldValidate: true,
                        },
                      );
                    }}
                  />
                </div>

                {/* ================= MANUAL INPUT (SYNCED) ================= */}
                <Controller
                  name={`locations.${index}.coordinates.0`}
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Longitude</FieldLabel>
                      <Input
                        type="number"
                        step="any"
                        value={field.value}
                        onChange={(e) => {
                          const lng = parseFloat(e.target.value || "0");
                          const lat =
                            form.getValues(
                              `locations.${index}.coordinates.1`,
                            ) || 0;

                          field.onChange(lng);
                          form.setValue(`locations.${index}.coordinates`, [
                            lng,
                            lat,
                          ]);
                        }}
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
                        value={field.value}
                        onChange={(e) => {
                          const lat = parseFloat(e.target.value || "0");
                          const lng =
                            form.getValues(
                              `locations.${index}.coordinates.0`,
                            ) || 0;

                          field.onChange(lat);
                          form.setValue(`locations.${index}.coordinates`, [
                            lng,
                            lat,
                          ]);
                        }}
                      />
                    </Field>
                  )}
                />
              </div>
            </div>
          );
        })}
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
                      {`${guide.name} - ${guide.role}`}
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
                <span className="text-sm">
                  {guide?.name ? `${guide?.name} : (${guide?.role})` : guideId}
                </span>
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
          <Button type="button" size="sm" onClick={addStartDate}>
            <Plus className="h-4 w-4 mr-1" />
            Add Date
          </Button>
        </div>

        {localStartDates.map((date, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              type="date"
              value={date}
              onChange={(e) => updateStartDate(index, e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeStartDate(index)}
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
