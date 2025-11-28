"use client";

import { useState } from "react";
import Modal from "./Modal";
import Button from "../Button";

interface UserRegistrationModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onSubmit: (
    firstname: string,
    lastname: string,
    email: string
  ) => Promise<void>;
}

export default function UserRegistrationModal({
  isOpen,
  email,
  onClose,
  onSubmit,
}: UserRegistrationModalProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstname.trim() || !lastname.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(firstname.trim(), lastname.trim(), email);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Complétez vos informations"
      closeOnBackdropClick={false}
      variant="dark"
      footer={
        <>
          <Button onClick={onClose} variant="outline" disabled={isSubmitting}>
            Annuler
          </Button>
          <Button
            onClick={(e) => {
              e?.preventDefault();
              handleSubmit(e as any);
            }}
            variant="primary"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Création..." : "Créer mon compte"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-white/90 mb-1 font-sans"
          >
            Prénom
          </label>
          <input
            id="firstname"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full px-4 py-2 border border-white/10 bg-white/5 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/20 outline-none text-white placeholder:text-white/40 font-sans"
            placeholder="Votre prénom"
            required
            disabled={isSubmitting}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>

        <div>
          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-white/90 mb-1 font-sans"
          >
            Nom
          </label>
          <input
            id="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-4 py-2 border border-white/10 bg-white/5 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/20 outline-none text-white placeholder:text-white/40 font-sans"
            placeholder="Votre nom"
            required
            disabled={isSubmitting}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/90 mb-1 font-sans"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            className="w-full px-4 py-2 border border-white/10 bg-white/5 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/20 outline-none text-white/70 cursor-not-allowed font-sans"
            placeholder="votre@email.com"
            disabled
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <p className="mt-1 text-xs text-white/50 font-sans">
            Email détecté depuis votre compte de connexion
          </p>
        </div>
      </form>
    </Modal>
  );
}
