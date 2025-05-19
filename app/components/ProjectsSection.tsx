import React from "react";
import ProjectCarousel from "./ProjectCarousel";
import styles from "./css/projects-section.module.css";

const ProjectsSection = () => {
  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Credit Montoring Portal",
      description: "Frontend Engineer",
      imageUrl: "/images/credit-monitoring.png",
    },
    {
      id: 2,
      title: "Access Africa Admin Portal",
      description: "Frontend Engineer",
      imageUrl: "/images/access-admin.png",
    },
    {
      id: 3,
      title: "HR Management Portal",
      description: "Frontend Engineer",
      imageUrl: "/images/hr.png",
    },
    {
      id: 4,
      title: "Automated Billing Assistant",
      description: "Frontend Engineer",
      imageUrl: "/images/auto-bill.png",
    },
  ];

  return (
    // <div className={styles.container}>
    //   {/* Blue background */}
    //   <div className={styles.blueBackground}></div>

    //   {/* Peach/orange section */}
    //   <div className={styles.peachSection}></div>

    //   {/* White tilted card - this will hold our carousel */}
    //   <div className={styles.whiteCard}>
    //     <h2 className={styles.sectionTitle}>My Projects</h2>

   
        <div className={styles.carouselWrapper}>
          <ProjectCarousel projects={projects} />
        </div>
    //   </div>
    // </div>
  );
};

export default ProjectsSection;
