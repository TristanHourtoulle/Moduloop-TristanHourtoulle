/**
 * Minimal PDF Document for Testing
 * Tests @react-pdf/renderer without images
 */

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { ProjectType } from "@models/Project";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F6F6F6",
    padding: 40,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

interface ProjectPDFMinimalProps {
  project: ProjectType;
  user: any;
}

export const ProjectPDFMinimal = ({
  project,
  user,
}: ProjectPDFMinimalProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Projet: {project.name}</Text>
          <Text style={styles.text}>Description: {project.description || "Aucune description"}</Text>
          <Text style={styles.text}>Créé par: {user?.firstName} {user?.name}</Text>
          <Text style={styles.text}>Nombre de produits: {Array.isArray(project.products) ? project.products.length : 0}</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.subtitle}>Produits:</Text>
          {Array.isArray(project.products) &&
            project.products.map((product: any, index: number) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.text}>
                  {index + 1}. {product.product[0]?.name || "Produit inconnu"}
                </Text>
                <Text style={{ fontSize: 10, marginLeft: 15 }}>
                  Neuf: {product.qNew} | Réemploi: {product.qUsed}
                </Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};
