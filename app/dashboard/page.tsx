import Header from "../components/dashboard/Header";
import projectLinks from "../data/dashboard/projectLinks";
import ProjectCard from "../components/dashboard/ProjectCard";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        projectLogo="/images/logos/logo_dark.png"
        projectName="Hubmify"
        userAvatar="/images/logos/logo_dark.png"
        userName="Matyeu"
      />
      <div className="p-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-2">
          Sélectionne ton projet
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Choisis un projet pour accéder à son tableau de bord
        </p>
        <ProjectCard data={projectLinks} />
      </div>
    </div>
  );
};

export default page;
