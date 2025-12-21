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
        `https://online-ticket-system-server.vercel.app/tickets`,
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
      className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center bg-base-100 p-3 sm:p-5 rounded-xl"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-6 space-y-6 shadow-lg sm:max-w-full bg-base-100 sm:p-8 rounded-2xl"
      >
        {/* Form Title */}
        <h1 className="mb-6 text-3xl font-bold text-center text-green-700">
          Add New Ticket
        </h1>

        {/* Ticket Title */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Ticket Title</label>
          <input
            type="text"
            placeholder="Dhaka → Sylhet (AC Coach)"
            {...register("title", { required: "Title required" })}
            className="w-full px-4 py-2 transition border border-green-200 rounded-lg outline-none bg-green-50 focus:ring-2 focus:ring-green-300"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* From / To */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="flex items-center gap-2 font-semibold">
              <FaMapMarkerAlt className="text-green-500" /> From
            </label>
            <input
              type="text"
              {...register("from", { required: true })}
              className="w-full px-4 py-2 transition border border-green-200 rounded-lg outline-none bg-green-50 focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div className="space-y-1">
            <label className="flex items-center gap-2 font-semibold">
              <FaMapMarkerAlt className="text-green-500" /> To
            </label>
            <input
              type="text"
              {...register("to", { required: true })}
              className="w-full px-4 py-2 transition border border-green-200 rounded-lg outline-none bg-green-50 focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        {/* Transport Type */}
        <div className="space-y-1">
          <label className="font-semibold">Transport Type</label>
          <select
            {...register("transport_type", { required: true })}
            className="w-full px-4 py-2 transition border border-green-200 rounded-lg outline-none bg-green-50 focus:ring-2 focus:ring-green-300"
          >
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="launch">Launch</option>
            <option value="plane">Plane</option>
          </select>
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="font-semibold">Price (per unit)</label>
            <input
              type="number"
              {...register("price", { required: true, min: 0 })}
              className="w-full px-4 py-2 transition border border-green-200 rounded-lg outline-none bg-green-50 focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Ticket Quantity</label>
            <input
              type="number"
              {...register("ticket_quantity", { required: true, min: 1 })}
              className="w-full px-4 py-2 transition border border-green-200 rounded-lg outline-none bg-green-50 focus:ring-2 focus:ring-green-300"
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
            className="w-full px-4 py-2 transition border border-green-200 rounded-lg outline-none bg-green-50 focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full h-32 px-4 py-2 transition border border-green-200 rounded-lg outline-none bg-green-50 focus:ring-2 focus:ring-green-300"
          ></textarea>
        </div>

        {/* Departure Date & Time */}
        <div className="space-y-1">
          <label className="font-semibold">Departure Date & Time</label>
          <input
            type="datetime-local"
            {...register("departure_date_time", { required: true })}
            className="w-full px-4 py-2 transition border border-green-200 rounded-lg outline-none bg-green-50 focus:ring-2 focus:ring-green-300"
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
        <div className="grid grid-cols-1 gap-4 p-4 bg-gray-100 border rounded-lg md:grid-cols-2">
          <div className="space-y-1">
            <label className="font-semibold">Vendor Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Vendor Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700"
        >
          {isPending ? (
            <TbFidgetSpinner className="text-lg animate-spin" />
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
