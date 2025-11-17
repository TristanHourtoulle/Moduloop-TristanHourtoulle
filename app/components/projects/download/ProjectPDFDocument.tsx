/**
 * Project PDF Document Component
 * Optimized PDF generation using @react-pdf/renderer
 * Replaces the old Satori + PDFKit approach for 3-5x better performance
 */

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { ProjectType } from "@models/Project";
import {
  dateFormater,
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

// Styles optimisés pour @react-pdf/renderer
// Note: Tailwind CSS n'est pas supporté - styles en objets JavaScript
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F6F6F6",
    padding: 40,
    fontFamily: "Helvetica",
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    width: 300,
    height: "auto",
  },
  // Project Info Section
  projectInfoSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 30,
    marginBottom: 40,
  },
  projectTitle: {
    fontSize: 32,
    fontWeight: 600,
    fontFamily: "Helvetica",
    textAlign: "center",
    marginBottom: 10,
  },
  projectDescription: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  divider: {
    width: "75%",
    height: 1,
    backgroundColor: "#000",
    opacity: 0.25,
    marginVertical: 15,
    alignSelf: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    fontSize: 14,
  },
  infoLabel: {
    fontWeight: 400,
    color: "#333",
  },
  infoValue: {
    fontWeight: 600,
    marginLeft: 5,
    color: "#000",
  },
  // Products Section
  productsSection: {
    marginTop: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 20,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "48%",
    marginBottom: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 5,
  },
  productBase: {
    fontSize: 12,
    fontWeight: 400,
    opacity: 0.75,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginVertical: 10,
  },
  quantityLabel: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
  },
  // Impact Section
  impactSection: {
    marginTop: 30,
  },
  impactCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    borderRadius: 12,
    padding: 30,
    marginBottom: 20,
  },
  impactCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    width: "48%",
    borderTopWidth: 4,
  },
  impactCardTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 5,
  },
  impactCardSubtitle: {
    fontSize: 10,
    fontWeight: 300,
    marginBottom: 10,
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 600,
    marginRight: 5,
  },
  impactUnit: {
    fontSize: 10,
    fontWeight: 300,
  },
  impactValueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Equivalences Section
  equivalenceSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  equivalenceTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 15,
    textAlign: "center",
  },
  equivalenceCardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  equivalenceCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  equivalenceIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  equivalenceText: {
    flex: 1,
  },
  equivalenceLabel: {
    fontSize: 10,
    fontWeight: 300,
    color: "#666",
  },
  equivalenceValue: {
    fontSize: 14,
    fontWeight: 600,
    color: "#000",
  },
  // Comparison Section
  comparisonSection: {
    marginTop: 30,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
    textAlign: "center",
  },
  comparisonSubtitle: {
    fontSize: 14,
    fontWeight: 500,
    opacity: 0.75,
    marginBottom: 15,
    textAlign: "center",
  },
  comparisonCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  comparisonCard: {
    borderRadius: 12,
    padding: 15,
    width: "32%",
  },
  comparisonCardGreen: {
    backgroundColor: "#4AD860",
  },
  comparisonCardWhite: {
    backgroundColor: "white",
  },
  comparisonCardLabel: {
    fontSize: 10,
    fontWeight: 500,
    marginBottom: 10,
    color: "#000",
  },
  comparisonCardLabelWhite: {
    color: "white",
  },
  comparisonCardValue: {
    fontSize: 16,
    fontWeight: 600,
  },
  comparisonCardUnit: {
    fontSize: 10,
    fontWeight: 200,
  },
  thickDivider: {
    width: "75%",
    height: 3,
    backgroundColor: "#30C1BD",
    opacity: 0.5,
    marginVertical: 30,
    alignSelf: "center",
    borderRadius: 20,
  },
});

interface ProjectPDFDocumentProps {
  project: ProjectType;
  user: any;
  iconsDataUrls?: Record<string, string>;
}

// Helper function to calculate all impacts
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
      erf: numberFormater(Number(getERFimpact(newProject)), false),
      erfPercentage: getPercentage(
        Number(getERFimpact(newProject)),
        Number(getERFimpact(project))
      ),
      ase: numberFormater(Number(getASEimpact(newProject)), false),
      asePercentage: getPercentage(
        Number(getASEimpact(newProject)),
        Number(getASEimpact(project))
      ),
      em: Number(getEMimpact(newProject)),
      emPercentage: getPercentage(
        Number(getEMimpact(newProject)),
        Number(getEMimpact(project))
      ),
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
      erf: numberFormater(Number(getERFimpact(usedProject)), false),
      erfPercentage: getPercentage(
        Number(getERFimpact(project)),
        Number(getERFimpact(usedProject))
      ),
      ase: numberFormater(Number(getASEimpact(usedProject)), false),
      asePercentage: getPercentage(
        Number(getASEimpact(project)),
        Number(getASEimpact(usedProject))
      ),
      em: getEMimpact(usedProject),
      emPercentage: getPercentage(
        Number(getEMimpact(project)),
        Number(getEMimpact(usedProject))
      ),
    },
  };

  return impact;
}

export const ProjectPDFDocument: React.FC<ProjectPDFDocumentProps> = ({
  project,
  user,
  iconsDataUrls = {},
}) => {
  const impact = getAllImpact(project);

  // Helper function to get icon source
  const getIconSrc = (iconPath: string): string => {
    if (!iconPath || typeof iconPath !== 'string') {
      console.warn('[ProjectPDF] Invalid icon path:', iconPath);
      return '';
    }

    // Extract filename from path (works with both /icons/logo.png and full URLs)
    const parts = iconPath.split("/");
    const iconName = parts[parts.length - 1]; // Get last part (filename)

    // Try to get the mapped URL, otherwise use the original path
    const mappedUrl = iconName && iconsDataUrls[iconName] ? iconsDataUrls[iconName] : iconPath;

    // Ensure we return a string
    return typeof mappedUrl === 'string' ? mappedUrl : '';
  };

  return (
    <Document>
      {/* Page 1: Project Info & Products */}
      <Page size="A4" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <Image src={getIconSrc("/icons/logo.png")} style={styles.logo} />
        </View>

        {/* Project Information */}
        <View style={styles.projectInfoSection}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Appartient au groupe:</Text>
            <Text style={styles.infoValue}>{project.groupInfo?.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Créé par:</Text>
            <Text style={styles.infoValue}>
              {user?.firstName || ""} {user?.name ?? ""}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Créé le:</Text>
            <Text style={styles.infoValue}>
              {dateFormater(project.created_at ?? "").date}{" "}
              {dateFormater(project.created_at ?? "").time}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date de dernière modification:</Text>
            <Text style={styles.infoValue}>
              {dateFormater(project.updated_at ?? "").date}{" "}
              {dateFormater(project.updated_at ?? "").time}
            </Text>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            Les {Array.isArray(project.products) ? project.products.length : 0}{" "}
            produits de votre Projet
          </Text>

          <View style={styles.productsGrid}>
            {Array.isArray(project.products) &&
              project.products.slice(0, 4).map((product: any, index: number) => (
                <View key={product.product[0].id || index} style={styles.productCard}>
                  <Text style={styles.productName}>{product.product[0].name}</Text>
                  <Text style={styles.productBase}>{product.product[0].base}</Text>

                  {product.product[0].image && typeof product.product[0].image === 'string' && (
                    <Image
                      src={product.product[0].image}
                      style={styles.productImage}
                    />
                  )}

                  <View style={styles.divider} />

                  <Text style={styles.quantityLabel}>Quantité</Text>
                  <View style={styles.quantityRow}>
                    <Text>Neuf: <Text style={{ fontWeight: 600 }}>{product.qNew}</Text></Text>
                    <Text>Réemploi: <Text style={{ fontWeight: 600 }}>{product.qUsed}</Text></Text>
                  </View>
                </View>
              ))}
          </View>
        </View>
      </Page>

      {/* Page 2: Remaining Products (if more than 4) */}
      {Array.isArray(project.products) && project.products.length > 4 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.productsSection}>
            <Text style={styles.sectionTitle}>
              Produits (suite)
            </Text>

            <View style={styles.productsGrid}>
              {project.products.slice(4).map((product: any, index: number) => (
                <View key={product.product[0].id || index} style={styles.productCard}>
                  <Text style={styles.productName}>{product.product[0].name}</Text>
                  <Text style={styles.productBase}>{product.product[0].base}</Text>

                  {product.product[0].image && typeof product.product[0].image === 'string' && (
                    <Image
                      src={product.product[0].image}
                      style={styles.productImage}
                    />
                  )}

                  <View style={styles.divider} />

                  <Text style={styles.quantityLabel}>Quantité</Text>
                  <View style={styles.quantityRow}>
                    <Text>Neuf: <Text style={{ fontWeight: 600 }}>{product.qNew}</Text></Text>
                    <Text>Réemploi: <Text style={{ fontWeight: 600 }}>{product.qUsed}</Text></Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Page>
      )}

      {/* Page 3: Global Impact */}
      <Page size="A4" style={styles.page}>
        <View style={styles.impactSection}>
          <Text style={styles.sectionTitle}>
            Impact Global du projet {project.name}
          </Text>

          <View style={styles.impactCardsRow}>
            {/* Santé Humaine - RC */}
            <View style={[styles.impactCard, { borderTopColor: "#FF8A00" }]}>
              <Text style={styles.impactCardTitle}>Santé Humaine</Text>
              <Text style={styles.impactCardSubtitle}>Réchauffement Climatique</Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.impactValue, { color: "#FF8A00" }]}>
                  {impact.global.rc}
                </Text>
                <Text style={styles.impactUnit}>kg éq. CO2</Text>
              </View>
            </View>

            {/* Ecosystèmes - ASE */}
            <View style={[styles.impactCard, { borderTopColor: "#00A410" }]}>
              <Text style={styles.impactCardTitle}>Ecosystèmes</Text>
              <Text style={styles.impactCardSubtitle}>Acidification des Sols et de l'Eau</Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.impactValue, { color: "#00A410" }]}>
                  {impact.global.ase}
                </Text>
                <Text style={styles.impactUnit}>Mol H+</Text>
              </View>
            </View>
          </View>

          <View style={styles.impactCardsRow}>
            {/* Ressources - ERF */}
            <View style={[styles.impactCard, { borderTopColor: "#4169E1" }]}>
              <Text style={styles.impactCardTitle}>Ressources</Text>
              <Text style={styles.impactCardSubtitle}>Épuisement des Ressources Fossiles</Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.impactValue, { color: "#4169E1" }]}>
                  {impact.global.erf}
                </Text>
                <Text style={styles.impactUnit}>MJ</Text>
              </View>
            </View>

            {/* Eutrophisation Marine - EM */}
            <View style={[styles.impactCard, { borderTopColor: "#8B4513" }]}>
              <Text style={styles.impactCardTitle}>Eutrophisation Marine</Text>
              <Text style={styles.impactCardSubtitle}>Impact sur les écosystèmes aquatiques</Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.impactValue, { color: "#8B4513" }]}>
                  {impact.global.em}
                </Text>
                <Text style={styles.impactUnit}>kg P eq.</Text>
              </View>
            </View>
          </View>

          {/* Equivalences */}
          <View style={styles.equivalenceSection}>
            <Text style={styles.equivalenceTitle}>
              Équivalences de votre impact environnemental
            </Text>

            <View style={styles.equivalenceCardsRow}>
              <View style={styles.equivalenceCard}>
                <Image src={getIconSrc("/icons/avion.png")} style={styles.equivalenceIcon} />
                <View style={styles.equivalenceText}>
                  <Text style={styles.equivalenceLabel}>Voyages en avion</Text>
                  <Text style={styles.equivalenceValue}>{impact.global.plane} trajets</Text>
                </View>
              </View>

              <View style={styles.equivalenceCard}>
                <Image src={getIconSrc("/icons/suv.png")} style={styles.equivalenceIcon} />
                <View style={styles.equivalenceText}>
                  <Text style={styles.equivalenceLabel}>Kilomètres en voiture</Text>
                  <Text style={styles.equivalenceValue}>{impact.global.kilometers} km</Text>
                </View>
              </View>

              <View style={styles.equivalenceCard}>
                <Image src={getIconSrc("/icons/personnes.png")} style={styles.equivalenceIcon} />
                <View style={styles.equivalenceText}>
                  <Text style={styles.equivalenceLabel}>Émissions quotidiennes</Text>
                  <Text style={styles.equivalenceValue}>{impact.global.dailyBroadcast} personnes/jour</Text>
                </View>
              </View>

              <View style={styles.equivalenceCard}>
                <Image src={getIconSrc("/icons/pétrol.png")} style={styles.equivalenceIcon} />
                <View style={styles.equivalenceText}>
                  <Text style={styles.equivalenceLabel}>Litres de pétrole</Text>
                  <Text style={styles.equivalenceValue}>{impact.global.petrol} L</Text>
                </View>
              </View>

              <View style={styles.equivalenceCard}>
                <Image src={getIconSrc("/icons/maison.png")} style={styles.equivalenceIcon} />
                <View style={styles.equivalenceText}>
                  <Text style={styles.equivalenceLabel}>Consommation énergétique</Text>
                  <Text style={styles.equivalenceValue}>{impact.global.powerConsumption} foyers/an</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 4: Comparison with All New */}
      <Page size="A4" style={styles.page}>
        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>
            Comparaison avec tout en Neuf
          </Text>
          <Text style={styles.comparisonSubtitle}>
            Réchauffement Climatique (RC)
          </Text>

          <View style={styles.comparisonCardsRow}>
            {/* Emission évitée */}
            <View style={[styles.comparisonCard, styles.comparisonCardGreen]}>
              <Text style={[styles.comparisonCardLabel, styles.comparisonCardLabelWhite]}>
                % ÉMISSIONS ÉVITÉES
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.comparisonCardValue, { color: "white" }]}>
                  {impact.withNew.rcPercentage}%
                </Text>
              </View>
            </View>

            {/* Projet Actuel */}
            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()}
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.global.rc}</Text>
                <Text style={styles.comparisonCardUnit}>kg éq. CO2</Text>
              </View>
            </View>

            {/* Tout en Neuf */}
            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()} (TOUT EN NEUF)
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.withNew.rc}</Text>
                <Text style={styles.comparisonCardUnit}>kg éq. CO2</Text>
              </View>
            </View>
          </View>

          <View style={styles.thickDivider} />

          {/* ERF Comparison */}
          <Text style={styles.comparisonSubtitle}>
            Épuisement des Ressources Fossiles (ERF)
          </Text>

          <View style={styles.comparisonCardsRow}>
            <View style={[styles.comparisonCard, styles.comparisonCardGreen]}>
              <Text style={[styles.comparisonCardLabel, styles.comparisonCardLabelWhite]}>
                % RESSOURCES ÉPARGNÉES
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.comparisonCardValue, { color: "white" }]}>
                  {impact.withNew.erfPercentage}%
                </Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()}
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.global.erf}</Text>
                <Text style={styles.comparisonCardUnit}>MJ</Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()} (TOUT EN NEUF)
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.withNew.erf}</Text>
                <Text style={styles.comparisonCardUnit}>MJ</Text>
              </View>
            </View>
          </View>

          <View style={styles.thickDivider} />

          {/* ASE Comparison */}
          <Text style={styles.comparisonSubtitle}>
            Acidification des Sols et de l'Eau (ASE)
          </Text>

          <View style={styles.comparisonCardsRow}>
            <View style={[styles.comparisonCard, styles.comparisonCardGreen]}>
              <Text style={[styles.comparisonCardLabel, styles.comparisonCardLabelWhite]}>
                % ASE ÉVITÉ
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.comparisonCardValue, { color: "white" }]}>
                  {impact.withNew.asePercentage}%
                </Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()}
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.global.ase}</Text>
                <Text style={styles.comparisonCardUnit}>Mol H+</Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()} (TOUT EN NEUF)
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.withNew.ase}</Text>
                <Text style={styles.comparisonCardUnit}>Mol H+</Text>
              </View>
            </View>
          </View>

          <View style={styles.thickDivider} />

          {/* EM Comparison */}
          <Text style={styles.comparisonSubtitle}>
            Eutrophisation Marine (EM)
          </Text>

          <View style={styles.comparisonCardsRow}>
            <View style={[styles.comparisonCard, styles.comparisonCardGreen]}>
              <Text style={[styles.comparisonCardLabel, styles.comparisonCardLabelWhite]}>
                % EM ÉVITÉ
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.comparisonCardValue, { color: "white" }]}>
                  {impact.withNew.emPercentage}%
                </Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()}
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.global.em}</Text>
                <Text style={styles.comparisonCardUnit}>kg P eq.</Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()} (TOUT EN NEUF)
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.withNew.em}</Text>
                <Text style={styles.comparisonCardUnit}>kg P eq.</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 5: Comparison with Reuse */}
      <Page size="A4" style={styles.page}>
        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>
            Comparaison avec tout en Réemploi
          </Text>
          <Text style={styles.comparisonSubtitle}>
            Réchauffement Climatique (RC)
          </Text>

          <View style={styles.comparisonCardsRow}>
            {/* Emission évitée */}
            <View style={[styles.comparisonCard, styles.comparisonCardGreen]}>
              <Text style={[styles.comparisonCardLabel, styles.comparisonCardLabelWhite]}>
                % RC ÉVITÉ
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.comparisonCardValue, { color: "white" }]}>
                  {impact.withUsed.rcPercentage}%
                </Text>
              </View>
            </View>

            {/* Meilleur Projet */}
            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()} (TOUT EN RÉEMPLOI)
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.withUsed.rc}</Text>
                <Text style={styles.comparisonCardUnit}>kg éq. CO2</Text>
              </View>
            </View>

            {/* Projet Actuel */}
            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()}
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.global.rc}</Text>
                <Text style={styles.comparisonCardUnit}>kg éq. CO2</Text>
              </View>
            </View>
          </View>

          <View style={styles.thickDivider} />

          {/* ERF Comparison */}
          <Text style={styles.comparisonSubtitle}>
            Épuisement des Ressources Fossiles (ERF)
          </Text>

          <View style={styles.comparisonCardsRow}>
            <View style={[styles.comparisonCard, styles.comparisonCardGreen]}>
              <Text style={[styles.comparisonCardLabel, styles.comparisonCardLabelWhite]}>
                % ERF ÉVITÉ
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.comparisonCardValue, { color: "white" }]}>
                  {impact.withUsed.erfPercentage}%
                </Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()} (TOUT EN RÉEMPLOI)
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.withUsed.erf}</Text>
                <Text style={styles.comparisonCardUnit}>MJ</Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()}
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.global.erf}</Text>
                <Text style={styles.comparisonCardUnit}>MJ</Text>
              </View>
            </View>
          </View>

          <View style={styles.thickDivider} />

          {/* ASE Comparison */}
          <Text style={styles.comparisonSubtitle}>
            Acidification des Sols et de l'Eau (ASE)
          </Text>

          <View style={styles.comparisonCardsRow}>
            <View style={[styles.comparisonCard, styles.comparisonCardGreen]}>
              <Text style={[styles.comparisonCardLabel, styles.comparisonCardLabelWhite]}>
                % ASE ÉVITÉ
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.comparisonCardValue, { color: "white" }]}>
                  {impact.withUsed.asePercentage}%
                </Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()} (TOUT EN RÉEMPLOI)
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.withUsed.ase}</Text>
                <Text style={styles.comparisonCardUnit}>Mol H+</Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()}
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.global.ase}</Text>
                <Text style={styles.comparisonCardUnit}>Mol H+</Text>
              </View>
            </View>
          </View>

          <View style={styles.thickDivider} />

          {/* EM Comparison */}
          <Text style={styles.comparisonSubtitle}>
            Eutrophisation Marine (EM)
          </Text>

          <View style={styles.comparisonCardsRow}>
            <View style={[styles.comparisonCard, styles.comparisonCardGreen]}>
              <Text style={[styles.comparisonCardLabel, styles.comparisonCardLabelWhite]}>
                % EM ÉVITÉ
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={[styles.comparisonCardValue, { color: "white" }]}>
                  {impact.withUsed.emPercentage}%
                </Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()} (TOUT EN RÉEMPLOI)
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.withUsed.em}</Text>
                <Text style={styles.comparisonCardUnit}>kg P eq.</Text>
              </View>
            </View>

            <View style={[styles.comparisonCard, styles.comparisonCardWhite]}>
              <Text style={styles.comparisonCardLabel}>
                {project.name?.toUpperCase()}
              </Text>
              <View style={styles.impactValueRow}>
                <Text style={styles.comparisonCardValue}>{impact.global.em}</Text>
                <Text style={styles.comparisonCardUnit}>kg P eq.</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
