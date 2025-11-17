import { ProjectType } from "@models/Project";
import {
  convertTime,
  dateFormater,
  getNonNumbers,
  getNumbersOnly,
} from "@utils/dateFormater";
import {
  getASEimpact,
  getCO2impact,
  getEMimpact,
  getERFimpact,
  getHouseEquivalence,
  getKilometersEquivalence,
  getPercentage,
  getPersonEquivalence,
  getPetrolEquivalence,
  getPlaneEquivalence,
} from "@utils/getImpact";
import { numberFormater } from "@utils/numberFormater";
import {
  convertProjectToNewProducts,
  convertProjectToUsedProducts,
} from "@utils/projects";

function getAllImpact(project: any) {
  let usedProject = convertProjectToUsedProducts(project.products, project);
  let newProject = convertProjectToNewProducts(project.products, project);
  let impact = {
    global: {
      rc: numberFormater(Number(getCO2impact(project)), false),
      erf: numberFormater(Number(getERFimpact(project)), false),
      ase: numberFormater(Number(getASEimpact(project)), false),
      em: getEMimpact(project),
      plane: numberFormater(
        Number(getPlaneEquivalence(Number(getCO2impact(project)))),
        false
      ),
      dailyBroadcast: numberFormater(
        Number(getPersonEquivalence(Number(getCO2impact(project)))),
        false
      ),
      kilometers: numberFormater(
        Number(getKilometersEquivalence(Number(getCO2impact(project)))),
        false
      ),
      petrol: numberFormater(
        Number(getPetrolEquivalence(Number(getERFimpact(project)))),
        false
      ),
      powerConsumption: getHouseEquivalence(Number(getERFimpact(project))),
    },
    withNew: {
      rc: numberFormater(Number(getCO2impact(newProject)), false),
      rcDelta: numberFormater(
        Number(getCO2impact(newProject)) - Number(getCO2impact(project)),
        false
      ),
      rcPercentage: getPercentage(
        Number(getCO2impact(newProject)),
        Number(getCO2impact(project))
      ),
      plane: numberFormater(
        Number(
          getPlaneEquivalence(
            Number(getCO2impact(newProject)) - Number(getCO2impact(project))
          )
        ),
        false
      ),
      dailyBroadcast: numberFormater(
        Number(
          getPersonEquivalence(
            Number(getCO2impact(newProject)) - Number(getCO2impact(project))
          )
        ),
        false
      ),
      kilometers: numberFormater(
        Number(
          getKilometersEquivalence(
            Number(getCO2impact(newProject)) - Number(getCO2impact(project))
          )
        ),
        false
      ),
      erf: numberFormater(Number(getERFimpact(newProject)), false),
      erfPercentage: getPercentage(
        Number(getERFimpact(newProject)),
        Number(getERFimpact(project))
      ),
      erfDelta: numberFormater(
        Number(getERFimpact(newProject)) - Number(getERFimpact(project)),
        false
      ),
      petrol: numberFormater(
        Number(
          getPetrolEquivalence(
            Number(getERFimpact(newProject)) - Number(getERFimpact(project))
          )
        ),
        false
      ),
      powerConsumption: numberFormater(
        Number(
          getHouseEquivalence(
            Number(getERFimpact(newProject)) - Number(getERFimpact(project))
          )
        ),
        false
      ),
      ase: numberFormater(Number(getASEimpact(newProject)), false),
      asePercentage: getPercentage(
        Number(getASEimpact(newProject)),
        Number(getASEimpact(project))
      ),
      aseDelta: numberFormater(
        Number(getASEimpact(newProject)) - Number(getASEimpact(project)),
        false
      ),
      em: Number(getEMimpact(newProject)),
      emPercentage: getPercentage(
        Number(getEMimpact(newProject)),
        Number(getEMimpact(project))
      ),
      emDelta: Number(getEMimpact(newProject)) - Number(getEMimpact(project)),
    },
    withUsed: {
      rc: numberFormater(Number(getCO2impact(usedProject)), false),
      rcPercentage: getPercentage(
        Number(getCO2impact(project)),
        Number(getCO2impact(usedProject))
      ),
      rcDelta: numberFormater(
        Number(getCO2impact(project)) - Number(getCO2impact(usedProject)),
        false
      ),
      plane: numberFormater(
        Number(
          getPlaneEquivalence(
            Number(getCO2impact(project)) - Number(getCO2impact(usedProject))
          )
        ),
        false
      ),
      dailyBroadcast: numberFormater(
        Number(
          getPersonEquivalence(
            Number(getCO2impact(project)) - Number(getCO2impact(usedProject))
          )
        ),
        false
      ),
      kilometers: numberFormater(
        Number(
          getKilometersEquivalence(
            Number(getCO2impact(project)) - Number(getCO2impact(usedProject))
          )
        ),
        false
      ),
      erf: numberFormater(Number(getERFimpact(usedProject)), false),
      erfPercentage: getPercentage(
        Number(getERFimpact(project)),
        Number(getERFimpact(usedProject))
      ),
      erfDelta: numberFormater(
        Number(getERFimpact(project)) - Number(getERFimpact(usedProject)),
        false
      ),
      petrol: numberFormater(
        Number(
          getPetrolEquivalence(
            Number(getERFimpact(project)) - Number(getERFimpact(usedProject))
          )
        ),
        false
      ),
      powerConsumption: numberFormater(
        Number(
          getHouseEquivalence(
            Number(getERFimpact(project)) - Number(getERFimpact(usedProject))
          )
        ),
        false
      ),
      ase: numberFormater(Number(getASEimpact(usedProject)), false),
      asePercentage: getPercentage(
        Number(getASEimpact(project)),
        Number(getASEimpact(usedProject))
      ),
      aseDelta: numberFormater(
        Number(getASEimpact(project)) - Number(getASEimpact(usedProject)),
        false
      ),
      em: getEMimpact(usedProject),
      emPercentage: getPercentage(
        Number(getEMimpact(project)),
        Number(getEMimpact(usedProject))
      ),
      emDelta: Number(getEMimpact(project)) - Number(getEMimpact(usedProject)),
    },
  };

  return impact;
}

export type ProjectPNGProps = {
  width: number;
  project: ProjectType;
  user: any;
  iconsDataUrls?: Record<string, string>;
};

export const ProjectPNG = ({ width, project, user, iconsDataUrls }: ProjectPNGProps) => {
  const impact = getAllImpact(project);

  // Helper function to get icon source
  const getIconSrc = (iconPath: string) => {
    if (!iconsDataUrls) return iconPath;
    const iconName = iconPath.split("/").pop();
    return iconName && iconsDataUrls[iconName] ? iconsDataUrls[iconName] : iconPath;
  };

  console.log("ProjectPNG: ", project);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "5%",
        backgroundColor: "#F6F6F6",
        color: "black",
        borderRadius: "16px",
        width: `${width}px`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <img
          src={getIconSrc("/icons/logo.png")}
          alt="Logo"
          style={{
            width: "600px",
          }}
        />
      </div>
      {/* Project's info */}
      <div
        style={{
          marginTop: "120px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "flex-start",
          backgroundColor: "white",
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingLeft: "80px",
          paddingRight: "80px",
          borderRadius: "16px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <p
          style={{
            fontSize: "96px",
            fontWeight: 600,
            fontFamily: "Outfit",
            margin: 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {project.name}
        </p>
        <p
          style={{
            fontSize: "48px",
            fontWeight: 400,
            fontFamily: "Outfit",
            margin: 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {project.description}
        </p>
        <hr
          style={{
            width: "75%",
            border: "1px solid black",
            opacity: 0.25,
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "Outfit",
            fontSize: "48px",
            fontWeight: 400,
            margin: 0,
          }}
        >
          <p
            style={{
              margin: 0,
            }}
          >
            Appartient au groupe:
          </p>
          <p
            style={{
              fontWeight: 600,
              margin: 0,
              marginLeft: "20px",
            }}
          >
            {project.groupInfo?.name}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            marginRight: "20px",
            alignItems: "center",
            fontFamily: "Outfit",
            fontSize: "48px",
            fontWeight: 400,
            margin: 0,
          }}
        >
          <p
            style={{
              margin: 0,
            }}
          >
            Créer par:
          </p>
          <p
            style={{
              fontWeight: 600,
              margin: 0,
              marginLeft: "20px",
            }}
          >
            {user?.firstName || ""} {user?.name ?? ""}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "Outfit",
            fontSize: "48px",
            fontWeight: 400,
            margin: 0,
          }}
        >
          <p
            style={{
              margin: 0,
            }}
          >
            Créé le:
          </p>
          <p
            style={{
              fontWeight: 600,
              margin: 0,
              marginLeft: "20px",
            }}
          >
            {dateFormater(project.created_at ?? "").date}{" "}
            {dateFormater(project.created_at ?? "").time}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            marginRight: "20px",
            alignItems: "center",
            fontFamily: "Outfit",
            fontSize: "48px",
            fontWeight: 400,
            margin: 0,
          }}
        >
          <p
            style={{
              margin: 0,
            }}
          >
            Date de dernière modification:
          </p>
          <p
            style={{
              fontWeight: 600,
              margin: 0,
              marginLeft: "20px",
            }}
          >
            {dateFormater(project.updated_at ?? "").date}{" "}
            {dateFormater(project.updated_at ?? "").time}
          </p>
        </div>
      </div>
      {/* Products in projects */}
      <div
        style={{
          margin: 0,
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          fontFamily: "Outfit",
          fontSize: "48px",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          Les {Array.isArray(project.products) ? project.products.length : 0}{" "}
          produits de votre Projet
        </h2>

        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            gap: "40px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {Array.isArray(project.products) &&
            project.products.map((product: any) => (
              <div
                key={product.product[0].id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "2px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  paddingLeft: "80px",
                  paddingRight: "80px",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  width: "600px",
                  height: "700px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "48px",
                    fontWeight: 500,
                    margin: 0, // Réinitialise la marge par défaut
                    marginBottom: "10px", // Ajoute un espacement contrôlé
                  }}
                >
                  {product.product[0].name}
                </h3>
                <h5
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "36px",
                    fontWeight: 400,
                    opacity: 0.75,
                    margin: 0, // Réinitialise la marge par défaut
                    marginBottom: "10px", // Ajoute un espacement contrôlé
                  }}
                >
                  {product.product[0].base}
                </h5>
                <img
                  alt={product.product[0].name + "'s picture"}
                  src={product.product[0].image}
                  width={200}
                  height={200}
                  style={{
                    margin: 0, // Réinitialise la marge par défaut
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <hr
                  style={{
                    width: "75%",
                    border: "1px solid black",
                    margin: "20px 0",
                    marginLeft: "auto",
                    marginRight: "auto",
                    opacity: 0.3,
                  }}
                />
                <p
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "36px",
                    fontWeight: 400,
                    margin: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  Quantité
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Outfit",
                      fontSize: "36px",
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    Neuf:{"   "}
                    <strong>{product.qNew}</strong>
                  </p>
                  <p
                    style={{
                      fontFamily: "Outfit",
                      fontSize: "36px",
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    Réemploi:{"   "}
                    <strong>{product.qUsed}</strong>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <hr
        style={{
          width: "75%",
          border: "3px solid #30C1BD",
          margin: "40px 0",
          opacity: 0.5,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "20px",
          marginBottom: "100px",
          marginTop: "100px",
        }}
      />
      {/* Impact Global */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          fontFamily: "Outfit",
          fontSize: "48px",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          Impact Global du projet {project.name}
        </h2>

        <div
          style={{
            backgroundColor: "lightgrey",
            borderRadius: "16px",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "80px",
            paddingRight: "80px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              backgroundColor: "white",
              borderRadius: "16px",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              borderTop: `5px solid #FF8A00`,
              width: "600px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "45px",
                fontWeight: 500,
              }}
            >
              Santé Humaine
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 300,
              }}
            >
              Réchauffement Climatique
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: "#FF8A00",
                  fontSize: "55px",
                }}
              >
                {impact.global.rc}
              </p>

              <p
                style={{
                  margin: 0,
                  fontWeight: 300,
                  fontSize: "24px",
                }}
              >
                kg éq. CO2
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "white",
              borderRadius: "16px",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              borderTop: `5px solid #00A410`,
              width: "600px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "45px",
                fontWeight: 500,
              }}
            >
              Ecosystèmes
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 300,
              }}
            >
              Acidification des Sols et Eaux
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: "#00A410",
                  fontSize: "55px",
                }}
              >
                {impact.global.ase}
              </p>

              <p
                style={{
                  margin: 0,
                  fontWeight: 300,
                  fontSize: "24px",
                }}
              >
                mol H+ éq.
              </p>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 300,
              }}
            >
              Eutrophisation Marine
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: "#00A410",
                  fontSize: "55px",
                }}
              >
                {impact.global.em}
              </p>

              <p
                style={{
                  margin: 0,
                  fontWeight: 300,
                  fontSize: "24px",
                }}
              >
                kg P éq.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "white",
              borderRadius: "16px",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              borderTop: `5px solid #FF3030`,
              width: "600px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "45px",
                fontWeight: 500,
              }}
            >
              Ressources Naturelles
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 300,
              }}
            >
              Epuisement des Ressources Fossiles
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: "#FF3030",
                  fontSize: "55px",
                }}
              >
                {impact.global.erf}
              </p>

              <p
                style={{
                  margin: 0,
                  fontWeight: 300,
                  fontSize: "24px",
                }}
              >
                kg éq. CO2
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* CO2 equivalence */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          fontFamily: "Outfit",
          fontSize: "48px",
          backgroundColor: "rgba(255, 138, 0, 0.25)",
          borderRadius: "16px",
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingLeft: "80px",
          paddingRight: "80px",
          marginTop: "80px",
        }}
      >
        <h2
          style={{
            margin: 0,
            opacity: 0.75,
            fontWeight: 400,
            fontFamily: "MPLUSRounded1c",
            fontSize: "40px",
          }}
        >
          Réchauffement Climatique
        </h2>
        <h3
          style={{
            margin: 0,
            fontWeight: 500,
          }}
        >
          Vous consommez&nbsp;
          <span style={{ color: "rgb(255, 138, 0)" }}>{impact.global.rc}</span>
          &nbsp;
          <span style={{ opacity: 0.75 }}>kg éq. CO2</span>, équivaut à:
        </h3>

        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            gap: "40px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Plane */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "white",
              borderRadius: "16px",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              width: "600px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "35px",
                fontWeight: 500,
              }}
            >
              PARIS - NICE
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <img src={getIconSrc("/icons/avion.png")} alt="Plane" width={100} />
              <p
                style={{
                  margin: 0,
                  fontSize: "45px",
                  fontWeight: 400,
                }}
              >
                {impact.global.plane}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 200,
                }}
              >
                Aller-Retour
              </p>
            </div>
          </div>

          {/* PersonEquivalence */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "white",
              borderRadius: "16px",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              width: "600px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "35px",
                fontWeight: 500,
              }}
            >
              {"émission journalière".toUpperCase()}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <img src={getIconSrc("/icons/personnes.png")} alt="Personnes" width={100} />
              <p
                style={{
                  margin: 0,
                  fontSize: "45px",
                  fontWeight: 400,
                }}
              >
                {impact.global.dailyBroadcast}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 200,
                }}
              >
                Français
              </p>
            </div>
          </div>

          {/* Kilometers */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "white",
              borderRadius: "16px",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              width: "600px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "35px",
                fontWeight: 500,
              }}
            >
              {"kms parcouru en SUV".toUpperCase()}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <img src={getIconSrc("/icons/suv.png")} alt="Personnes" width={100} />
              <p
                style={{
                  margin: 0,
                  fontSize: "45px",
                  fontWeight: 400,
                }}
              >
                {impact.global.kilometers}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 200,
                }}
              >
                Kms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ERF equivalence */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          fontFamily: "Outfit",
          fontSize: "48px",
          backgroundColor: "rgba(255, 48, 48, 0.25)",
          borderRadius: "16px",
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingLeft: "80px",
          paddingRight: "80px",
          marginTop: "80px",
        }}
      >
        <h2
          style={{
            margin: 0,
            opacity: 0.75,
            fontWeight: 400,
            fontFamily: "MPLUSRounded1c",
            fontSize: "40px",
          }}
        >
          Epuisement des Ressources Fossiles
        </h2>
        <h3
          style={{
            margin: 0,
            fontWeight: 500,
          }}
        >
          Vous consommez&nbsp;
          <span style={{ color: "rgb(255, 48, 48)" }}>{impact.global.erf}</span>
          &nbsp;
          <span style={{ opacity: 0.75 }}>MJ</span>, équivaut à:
        </h3>

        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            gap: "40px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* PersonEquivalence */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "white",
              borderRadius: "16px",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              width: "900px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "35px",
                fontWeight: 500,
              }}
            >
              {"pétrol brut".toUpperCase()}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <img
                src={getIconSrc("/icons/pétrol.png")}
                alt="Pétrol"
                width={100}
                height={100} // Ajout de la hauteur
              />
              <p
                style={{
                  margin: 0,
                  fontSize: "45px",
                  fontWeight: 400,
                }}
              >
                {impact.global.petrol}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 200,
                }}
              >
                Barils
              </p>
            </div>
          </div>

          {/* Chauffage */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "white",
              borderRadius: "16px",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              width: "900px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "35px",
                fontWeight: 500,
              }}
            >
              {"consommation électrique d'un foyer".toUpperCase()}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <img
                src={getIconSrc("/icons/suv.png")}
                alt="Personnes"
                width={100}
                height={100} // Ajout de la hauteur
              />
              <p
                style={{
                  margin: 0,
                  fontSize: "45px",
                  fontWeight: 400,
                }}
              >
                {Number(
                  getNumbersOnly(
                    convertTime(Number(impact.global.powerConsumption))
                  )
                )}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 200,
                }}
              >
                {getNonNumbers(
                  convertTime(Number(impact.global.powerConsumption))
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr
        style={{
          width: "75%",
          border: "3px solid #30C1BD",
          margin: "40px 0",
          opacity: 0.5,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "20px",
          marginBottom: "100px",
          marginTop: "100px",
        }}
      />
      {/* Impact Compare (NEW) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          fontFamily: "Outfit",
          fontSize: "48px",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          Comparaison avec tout en Neuf
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            fontFamily: "Outfit",
            fontSize: "48px",
            backgroundColor: "rgba(255, 138, 0, 0.25)",
            borderRadius: "16px",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "80px",
            paddingRight: "80px",
            marginTop: "80px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Estimatif d&apos;impact de vos projets
          </h2>
          <h2
            style={{
              margin: 0,
              opacity: 0.75,
              fontWeight: 500,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Réchauffement Climatique
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Emission évitée */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#4AD860",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
                color: "white",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                % {"émissions évitées".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/ecologie.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "60px",
                    fontWeight: 600,
                  }}
                >
                  {impact.withNew.rcPercentage}%
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                ></p>
              </div>
            </div>

            {/* Meilleur Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/feuille.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.global.rc}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  kgCO2e
                </p>
              </div>
            </div>

            {/* Moins bon Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {(project.name + " (TOUT EN NEUF)").toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/rc.png")} alt="Worst" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withNew.rc}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  kgCO2e
                </p>
              </div>
            </div>
          </div>

          <h3
            style={{
              margin: 0,
              fontWeight: 500,
              lineHeight: "1.5", // Ajuste l'espacement des lignes pour améliorer la lisibilité
              fontSize: "40px", // Ajuste la taille de la police
              wordWrap: "break-word", // Permet de couper les mots si nécessaire
            }}
          >
            En choisissant {project.name}, Vous évitez:&nbsp;
            <span style={{ color: "rgb(255, 138, 0)" }}>
              {impact.withNew.rcDelta}
            </span>
            &nbsp;
            <span style={{ opacity: 0.75 }}>kg éq. CO2</span>, équivaut à:
          </h3>

          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "40px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Plane */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                PARIS - NICE
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/avion.png")} alt="Plane" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withNew.plane}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Aller-Retour
                </p>
              </div>
            </div>

            {/* PersonEquivalence */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {"émission journalière".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/personnes.png")} alt="Personnes" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withNew.dailyBroadcast}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Français
                </p>
              </div>
            </div>

            {/* Kilometers */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {"kms parcouru en SUV".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/suv.png")} alt="Personnes" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withNew.kilometers}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Kms
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Epuisement des ressources fossiles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            fontFamily: "Outfit",
            fontSize: "48px",
            backgroundColor: "rgba(255, 48, 48, 0.25)",
            borderRadius: "16px",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "80px",
            paddingRight: "80px",
            marginTop: "80px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Estimatif d&apos;impact de vos projets
          </h2>
          <h2
            style={{
              margin: 0,
              opacity: 0.75,
              fontWeight: 500,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            {"é".toUpperCase()}puisement des Ressources Fossiles
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Emission évitée */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#4AD860",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
                color: "white",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                % {"épuisement évité".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/ecologie.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "60px",
                    fontWeight: 600,
                  }}
                >
                  {impact.withNew.erfPercentage}%
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                ></p>
              </div>
            </div>

            {/* Meilleur Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/feuille.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.global.erf}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  MJ
                </p>
              </div>
            </div>

            {/* Moins bon Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {(project.name + " (TOUT EN NEUF)").toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/erf.png")} alt="Worst" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withNew.erf}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  MJ
                </p>
              </div>
            </div>
          </div>

          <h3
            style={{
              margin: 0,
              fontWeight: 500,
              lineHeight: "1.5", // Ajuste l'espacement des lignes pour améliorer la lisibilité
              fontSize: "40px", // Ajuste la taille de la police
              wordWrap: "break-word", // Permet de couper les mots si nécessaire
            }}
          >
            En choisissant {project.name}, Vous évitez:&nbsp;
            <span style={{ color: "rgb(255, 48, 48)" }}>
              {impact.withNew.erfDelta}
            </span>
            &nbsp;
            <span style={{ opacity: 0.75 }}>MJ</span>, équivaut à:
          </h3>

          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "40px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Pétrol Brut */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {"pétrol brut".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/pétrol.png")} alt="Plane" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withNew.petrol}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Barils
                </p>
              </div>
            </div>

            {/* PersonEquivalence */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {"Consommation électrique d'un foyer".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/maison.png")} alt="Personnes" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withNew.powerConsumption}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Jours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ASE && EM */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            fontFamily: "Outfit",
            fontSize: "48px",
            backgroundColor: "rgba(0, 164, 16, 0.25)",
            borderRadius: "16px",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "80px",
            paddingRight: "80px",
            marginTop: "80px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Estimatif d&apos;impact de vos projets
          </h2>
          <h2
            style={{
              margin: 0,
              opacity: 0.75,
              fontWeight: 500,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Acidifications des Sols et Eaux
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Emission évitée */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#4AD860",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
                color: "white",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                % {"Acidification évitées".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/no-ase.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "60px",
                    fontWeight: 600,
                  }}
                >
                  {impact.withNew.asePercentage}%
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                ></p>
              </div>
            </div>

            {/* Meilleur Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/feuille.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.global.ase}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  mol H+
                </p>
              </div>
            </div>

            {/* Moins bon Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {(project.name + " (TOUT EN NEUF)").toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/ase.png")} alt="Worst" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withNew.ase}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Mol H+
                </p>
              </div>
            </div>
          </div>

          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Estimatif d&apos;impact de vos projets
          </h2>
          <h2
            style={{
              margin: 0,
              opacity: 0.75,
              fontWeight: 500,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Eutrophisation Marine
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Emission évitée */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#4AD860",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
                color: "white",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                % {"Eutrophisation évitée".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/no-em.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "60px",
                    fontWeight: 600,
                  }}
                >
                  {impact.withNew.emPercentage}%
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                ></p>
              </div>
            </div>

            {/* Meilleur Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/feuille.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.global.em}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  kg P eq.
                </p>
              </div>
            </div>

            {/* Moins bon Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {(project.name + " (TOUT EN NEUF)").toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/em.png")} alt="Worst" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withNew.em}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  kg P eq.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr
        style={{
          width: "75%",
          border: "3px solid #30C1BD",
          margin: "40px 0",
          opacity: 0.5,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "20px",
          marginBottom: "100px",
          marginTop: "100px",
        }}
      />

      {/* Impact Compare (USED) */}
      {/* Impact Compare (NEW) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          fontFamily: "Outfit",
          fontSize: "48px",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          Comparaison avec tout en Réemploi
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            fontFamily: "Outfit",
            fontSize: "48px",
            backgroundColor: "rgba(255, 138, 0, 0.25)",
            borderRadius: "16px",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "80px",
            paddingRight: "80px",
            marginTop: "80px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Estimatif d&apos;impact de vos projets
          </h2>
          <h2
            style={{
              margin: 0,
              opacity: 0.75,
              fontWeight: 500,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Réchauffement Climatique
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Emission évitée */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#4AD860",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
                color: "white",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                % {"émissions évitées".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/ecologie.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "60px",
                    fontWeight: 600,
                  }}
                >
                  {impact.withUsed.rcPercentage}%
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                ></p>
              </div>
            </div>

            {/* Meilleur Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {(project.name + " (TOUT EN réemploi)").toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/feuille.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withUsed.rc}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  kgCO2e
                </p>
              </div>
            </div>

            {/* Moins bon Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/rc.png")} alt="Worst" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.global.rc}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  kgCO2e
                </p>
              </div>
            </div>
          </div>

          <h3
            style={{
              margin: 0,
              fontWeight: 500,
              lineHeight: "1.5", // Ajuste l'espacement des lignes pour améliorer la lisibilité
              fontSize: "40px", // Ajuste la taille de la police
              wordWrap: "break-word", // Permet de couper les mots si nécessaire
            }}
          >
            En choisissant {project.name + " (TOUT EN réemploi)".toUpperCase()},
            Vous évitez:&nbsp;
            <span style={{ color: "rgb(255, 138, 0)" }}>
              {impact.withUsed.rcDelta}
            </span>
            &nbsp;
            <span style={{ opacity: 0.75 }}>kg éq. CO2</span>, équivaut à:
          </h3>

          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "40px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Plane */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                PARIS - NICE
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/avion.png")} alt="Plane" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withUsed.plane}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Aller-Retour
                </p>
              </div>
            </div>

            {/* PersonEquivalence */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {"émission journalière".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/personnes.png")} alt="Personnes" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withUsed.dailyBroadcast}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Français
                </p>
              </div>
            </div>

            {/* Kilometers */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {"kms parcouru en SUV".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/suv.png")} alt="Personnes" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withUsed.kilometers}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Kms
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Epuisement des ressources fossiles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            fontFamily: "Outfit",
            fontSize: "48px",
            backgroundColor: "rgba(255, 48, 48, 0.25)",
            borderRadius: "16px",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "80px",
            paddingRight: "80px",
            marginTop: "80px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Estimatif d&apos;impact de vos projets
          </h2>
          <h2
            style={{
              margin: 0,
              opacity: 0.75,
              fontWeight: 500,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            {"é".toUpperCase()}puisement des Ressources Fossiles
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Emission évitée */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#4AD860",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
                color: "white",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                % {"épuisement évité".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/ecologie.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "60px",
                    fontWeight: 600,
                  }}
                >
                  {impact.withUsed.erfPercentage}%
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                ></p>
              </div>
            </div>

            {/* Meilleur Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase() +
                  " (TOUT EN réemploi)".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/feuille.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withUsed.erf}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  MJ
                </p>
              </div>
            </div>

            {/* Moins bon Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/erf.png")} alt="Worst" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.global.erf}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  MJ
                </p>
              </div>
            </div>
          </div>

          <h3
            style={{
              margin: 0,
              fontWeight: 500,
              lineHeight: "1.5", // Ajuste l'espacement des lignes pour améliorer la lisibilité
              fontSize: "40px", // Ajuste la taille de la police
              wordWrap: "break-word", // Permet de couper les mots si nécessaire
            }}
          >
            En choisissant {project.name + " Tout en réemploi".toUpperCase()},
            Vous évitez:&nbsp;
            <span style={{ color: "rgb(255, 48, 48)" }}>
              {impact.withUsed.erfDelta}
            </span>
            &nbsp;
            <span style={{ opacity: 0.75 }}>MJ</span>, équivaut à:
          </h3>

          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "40px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Pétrol Brut */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {"pétrol brut".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/pétrol.png")} alt="Plane" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withUsed.petrol}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Barils
                </p>
              </div>
            </div>

            {/* PersonEquivalence */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {"Consommation électrique d'un foyer".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/maison.png")} alt="Personnes" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withUsed.powerConsumption}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Jours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ASE && EM */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            fontFamily: "Outfit",
            fontSize: "48px",
            backgroundColor: "rgba(0, 164, 16, 0.25)",
            borderRadius: "16px",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "80px",
            paddingRight: "80px",
            marginTop: "80px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Estimatif d&apos;impact de vos projets
          </h2>
          <h2
            style={{
              margin: 0,
              opacity: 0.75,
              fontWeight: 500,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Acidifications des Sols et Eaux
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Emission évitée */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#4AD860",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
                color: "white",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                % {"Acidification évitées".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/no-ase.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "60px",
                    fontWeight: 600,
                  }}
                >
                  {impact.withUsed.asePercentage}%
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                ></p>
              </div>
            </div>

            {/* Meilleur Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase() +
                  " (tout en réemploi)".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/feuille.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withUsed.ase}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  mol H+
                </p>
              </div>
            </div>

            {/* Moins bon Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/ase.png")} alt="Worst" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.global.ase}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  Mol H+
                </p>
              </div>
            </div>
          </div>

          <h2
            style={{
              margin: 0,
              fontWeight: 600,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Estimatif d&apos;impact de vos projets
          </h2>
          <h2
            style={{
              margin: 0,
              opacity: 0.75,
              fontWeight: 500,
              fontFamily: "MPLUSRounded1c",
              fontSize: "40px",
            }}
          >
            Eutrophisation Marine
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Emission évitée */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "#4AD860",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
                color: "white",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                % {"Eutrophisation évitée".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/no-em.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "60px",
                    fontWeight: 600,
                  }}
                >
                  {impact.withUsed.emPercentage}%
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                ></p>
              </div>
            </div>

            {/* Meilleur Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase() +
                  " (TOUT EN réemploi)".toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/feuille.png")} alt="Ecologie" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.withUsed.em}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  kg P eq.
                </p>
              </div>
            </div>

            {/* Moins bon Projet */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "16px",
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "600px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "35px",
                  fontWeight: 500,
                }}
              >
                {project.name?.toUpperCase()}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img src={getIconSrc("/icons/em.png")} alt="Worst" width={100} />
                <p
                  style={{
                    margin: 0,
                    fontSize: "45px",
                    fontWeight: 400,
                  }}
                >
                  {impact.global.em}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "35px",
                    fontWeight: 200,
                  }}
                >
                  kg P eq.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
