"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UserRegistrationModal from "@/app/components/Modals/UserRegistrationModal";

function DiscordCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "registration"
  >("loading");
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      const URL =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_BACKEND_URL_DEV
          : process.env.NEXT_PUBLIC_BACKEND_URL_PROD;

      if (!URL) {
        console.error("URL du backend non définie");
        setStatus("error");
        setTimeout(() => {
          router.push("/login?error=config_error");
        }, 2000);
        return;
      }

      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");

      if (code && state) {
        try {
          // Envoi du code et du state au backend pour traitement via GET (comme le callback l'attend)
          const params = new URLSearchParams({ code, state });
          const backendUrl = `${URL}/api/auth/discord/callback?${params.toString()}`;
          console.log("Appel backend:", backendUrl);

          const response = await fetch(backendUrl, {
            method: "GET",
            credentials: "include",
          });

          const data = await response.json();

          if (data.status === "success") {
            setStatus("success");
            setTimeout(() => {
              router.push("/dashboard");
            }, 1000);
          } else if (data.status === "user_not_found") {
            setUserEmail(data.email);
            setShowModal(true);
            setStatus("registration");
          } else {
            setStatus("error");
            setTimeout(() => {
              router.push("/login?error=auth_failed");
            }, 2000);
          }
        } catch (error) {
          console.error("Erreur lors du traitement du callback:", error);
          setStatus("error");
          setTimeout(() => {
            router.push("/login?error=server_error");
          }, 2000);
        }
      } else if (error) {
        // Erreur retournée par Discord
        setStatus("error");
        setTimeout(() => {
          router.push(`/login?error=${error}`);
        }, 2000);
      } else {
        // Pas de paramètres, vérifie si l'utilisateur est déjà authentifié
        try {
          const response = await fetch(`${URL}/api/auth/dashboard`, {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            setStatus("success");
            setTimeout(() => {
              router.push("/dashboard");
            }, 1000);
          } else {
            setStatus("error");
            setTimeout(() => {
              router.push("/login?error=auth_failed");
            }, 2000);
          }
        } catch (error) {
          console.error("Erreur lors de la vérification:", error);
          setStatus("error");
          setTimeout(() => {
            router.push("/login?error=server_error");
          }, 2000);
        }
      }
    };

    handleCallback();
  }, [router, searchParams]);

  const handleUserRegistration = async (
    firstname: string,
    lastname: string,
    email: string
  ) => {
    const URL =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BACKEND_URL_DEV
        : process.env.NEXT_PUBLIC_BACKEND_URL_PROD;

    if (!URL) {
      throw new Error("URL du backend non définie");
    }

    const response = await fetch(`${URL}/api/user/create-from-modal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ firstname, lastname, email }),
    });

    const data = await response.json();

    if (data.status === "success") {
      setShowModal(false);
      setStatus("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      throw new Error(data.message || "Erreur lors de la création du compte");
    }
  };

  return (
    <>
      <UserRegistrationModal
        isOpen={showModal}
        email={userEmail}
        onClose={() => {
          setShowModal(false);
          router.push("/login");
        }}
        onSubmit={handleUserRegistration}
      />
      <section className="py-4 px-6 lg:p-6 min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="text-center">
          {status === "loading" && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white font-sans">
                Vérification de l'authentification...
              </p>
            </>
          )}
          {status === "success" && (
            <>
              <div className="text-green-500 text-4xl mb-4">✓</div>
              <p className="text-white font-sans">Authentification réussie !</p>
              <p className="text-white/70 font-sans text-sm mt-2">
                Redirection en cours...
              </p>
            </>
          )}
          {status === "error" && (
            <>
              <div className="text-red-500 text-4xl mb-4">✗</div>
              <p className="text-white font-sans">Erreur d'authentification</p>
              <p className="text-white/70 font-sans text-sm mt-2">
                Redirection vers la page de connexion...
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function LoadingFallback() {
  return (
    <section className="py-4 px-6 lg:p-6 min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white font-sans">Chargement...</p>
      </div>
    </section>
  );
}

export default function DiscordCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DiscordCallbackContent />
    </Suspense>
  );
}
