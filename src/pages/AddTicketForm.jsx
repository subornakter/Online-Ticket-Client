import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TbFidgetSpinner, TbTicket } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../utils";

const AddTicketForm = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => {
      const token = await user?.getIdToken();
      return await axios.post(
        `${import.meta.env.VITE_API_URL}/tickets`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("Ticket added successfully");
      mutationReset();
      reset();
    },

    onError: (error) => console.log(error),
  });

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const imageUrl = await imageUpload(imageFile);

    const ticketData = {
      image: imageUrl,
      title: data.title,
      from: data.from,
      to: data.to,
      transport_type: data.transport_type,
      price: Number(data.price),
      ticket_quantity: Number(data.ticket_quantity),
      perks: data.perks.split(",").map((p) => p.trim()),
      description: data.description,
      departure_date_time: new Date(data.departure_date_time).toISOString(),

      seller: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    await mutateAsync(ticketData);
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center bg-gray-50 p-5 rounded-xl"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-base-100 p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Form Title */}
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Add New Ticket
        </h1>

        {/* Ticket Title */}
        <div className="space-y-1">
          <label className="text-gray-700 font-semibold">Ticket Title</label>
          <input
            type="text"
            placeholder="Dhaka → Sylhet (AC Coach)"
            {...register("title", { required: "Title required" })}
            className="w-full px-4 py-2 border border-green-200 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-300 outline-none transition"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* From / To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" /> From
            </label>
            <input
              type="text"
              {...register("from", { required: true })}
              className="w-full px-4 py-2 border border-green-200 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" /> To
            </label>
            <input
              type="text"
              {...register("to", { required: true })}
              className="w-full px-4 py-2 border border-green-200 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>
        </div>

        {/* Transport Type */}
        <div className="space-y-1">
          <label className="font-semibold">Transport Type</label>
          <select
            {...register("transport_type", { required: true })}
            className="w-full px-4 py-2 border border-green-200 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-300 outline-none transition"
          >
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="launch">Launch</option>
            <option value="plane">Plane</option>
          </select>
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold">Price (per unit)</label>
            <input
              type="number"
              {...register("price", { required: true, min: 0 })}
              className="w-full px-4 py-2 border border-green-200 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Ticket Quantity</label>
            <input
              type="number"
              {...register("ticket_quantity", { required: true, min: 1 })}
              className="w-full px-4 py-2 border border-green-200 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>
        </div>

        {/* Perks */}
        <div className="space-y-1">
          <label className="font-semibold">Perks (comma separated)</label>
          <input
            type="text"
            placeholder="AC, Reclining seat, On-board restroom"
            {...register("perks", { required: true })}
            className="w-full px-4 py-2 border border-green-200 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-300 outline-none transition"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full px-4 py-2 border border-green-200 bg-green-50 rounded-lg h-32 focus:ring-2 focus:ring-green-300 outline-none transition"
          ></textarea>
        </div>

        {/* Departure Date & Time */}
        <div className="space-y-1">
          <label className="font-semibold">Departure Date & Time</label>
          <input
            type="datetime-local"
            {...register("departure_date_time", { required: true })}
            className="w-full px-4 py-2 border border-green-200 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-300 outline-none transition"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="font-semibold">Ticket Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="w-full"
          />
        </div>

        {/* Vendor Info (readonly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg border">
          <div className="space-y-1">
            <label className="font-semibold">Vendor Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Vendor Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl flex justify-center items-center gap-2 font-semibold shadow-md hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
        >
          {isPending ? (
            <TbFidgetSpinner className="animate-spin text-lg" />
          ) : (
            <>
              <TbTicket className="text-lg" /> Add Ticket
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddTicketForm;
