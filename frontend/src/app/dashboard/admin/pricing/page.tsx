"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/api/client";
import { simpleLogout } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type PricingPlan = {
  _id: string;
  name: string;
  price: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
  isActive: boolean;
};

type FormState = {
  name: string;
  price: string;
  features: string;
  notIncluded: string;
  popular: boolean;
  isActive: boolean;
};

const initialForm: FormState = {
  name: "",
  price: "",
  features: "",
  notIncluded: "",
  popular: false,
  isActive: true,
};

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object"
  ) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    const message = response?.data?.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }
  return fallback;
};

export default function AdminPricingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token, isOrganizer, isSuperUser } = useAppSelector((state) => state.auth);

  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const isAuthorized = useMemo(
    () => Boolean(token && (isOrganizer || isSuperUser)),
    [token, isOrganizer, isSuperUser]
  );

  const fetchPlans = useCallback(async () => {
    if (!isAuthorized) return;

    setLoading(true);
    setMessage("");
    try {
      const response = await axiosClient.get("/api/pricing/all");
      setPlans(response.data?.data || []);
    } catch (error: unknown) {
      setMessage(getErrorMessage(error, "Failed to load pricing plans"));
    } finally {
      setLoading(false);
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/auth/Login");
      return;
    }
    setTimeout(() => {
      fetchPlans();
    }, 0);
  }, [fetchPlans, isAuthorized, router]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      name: form.name.trim(),
      price: form.price.trim(),
      features: splitLines(form.features),
      notIncluded: splitLines(form.notIncluded),
      popular: form.popular,
      isActive: form.isActive,
    };

    try {
      if (editingId) {
        await axiosClient.put(`/api/pricing/${editingId}`, payload);
        setMessage("Pricing plan updated");
      } else {
        await axiosClient.post("/api/pricing", payload);
        setMessage("Pricing plan created");
      }
      resetForm();
      fetchPlans();
    } catch (error: unknown) {
      setMessage(getErrorMessage(error, "Failed to save pricing plan"));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingId(plan._id);
    setForm({
      name: plan.name,
      price: plan.price,
      features: (plan.features || []).join("\n"),
      notIncluded: (plan.notIncluded || []).join("\n"),
      popular: plan.popular,
      isActive: plan.isActive,
    });
  };

  const handleDelete = async (id: string) => {
    const shouldDelete = window.confirm("Delete this pricing plan?");
    if (!shouldDelete) return;

    try {
      await axiosClient.delete(`/api/pricing/${id}`);
      setMessage("Pricing plan deleted");
      fetchPlans();
    } catch (error: unknown) {
      setMessage(getErrorMessage(error, "Failed to delete pricing plan"));
    }
  };

  const handleLogout = async () => {
    await dispatch(simpleLogout());
    router.push("/auth/Login");
  };

  return (
    <main className="min-h-screen bg-[#fcfdfd] p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-black text-[#1a2522]">Pricing Panel</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 font-semibold text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>

        {message && (
          <div className="rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700">{message}</div>
        )}

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#1a2522]">
            {editingId ? "Edit Pricing Plan" : "Create Pricing Plan"}
          </h2>
          <form className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Plan name"
              className="rounded-xl border border-gray-300 px-3 py-2"
            />
            <input
              required
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="Price (e.g. 3,000)"
              className="rounded-xl border border-gray-300 px-3 py-2"
            />
            <textarea
              value={form.features}
              onChange={(e) => setForm((prev) => ({ ...prev, features: e.target.value }))}
              placeholder="Features (one per line)"
              className="rounded-xl border border-gray-300 px-3 py-2"
            />
            <textarea
              value={form.notIncluded}
              onChange={(e) => setForm((prev) => ({ ...prev, notIncluded: e.target.value }))}
              placeholder="Not included (one per line)"
              className="rounded-xl border border-gray-300 px-3 py-2"
            />
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={form.popular}
                onChange={(e) => setForm((prev) => ({ ...prev, popular: e.target.checked }))}
              />
              Mark as popular
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
              />
              Active on landing page
            </label>
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#3f5a54] px-5 py-2 font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update Plan" : "Create Plan"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-gray-300 px-5 py-2 font-semibold text-[#1a2522]"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#1a2522]">Existing Plans</h2>
          {loading ? (
            <p className="mt-3 text-sm text-gray-600">Loading plans...</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600">
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Popular</th>
                    <th className="px-3 py-2">Active</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan._id} className="border-b border-gray-100">
                      <td className="px-3 py-2 font-semibold text-[#1a2522]">{plan.name}</td>
                      <td className="px-3 py-2">{plan.price}</td>
                      <td className="px-3 py-2">{plan.popular ? "Yes" : "No"}</td>
                      <td className="px-3 py-2">{plan.isActive ? "Yes" : "No"}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(plan)}
                            className="rounded-lg border border-gray-300 px-3 py-1 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(plan._id)}
                            className="rounded-lg border border-red-300 px-3 py-1 font-medium text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
