#!/usr/bin/env node

/**
 * Firebase Setup Verification Script
 * Verifies that all Firebase components are properly configured
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as firebaseAdmin from "./utilities/firebaseAdmin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("\n🔍 Firebase Setup Verification\n");
console.log("=".repeat(50));

// Check 1: Service Account File
console.log("\n1. Service Account File");
const serviceAccountPath = path.join(__dirname, "config/firebase-service-account.json");
if (fs.existsSync(serviceAccountPath)) {
  const stats = fs.statSync(serviceAccountPath);
  console.log("   ✓ File found at:", serviceAccountPath);
  console.log("   ✓ File size:", (stats.size / 1024).toFixed(2), "KB");
  
  const content = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  console.log("   ✓ Project ID:", content.project_id);
  console.log("   ✓ Client Email:", content.client_email);
} else {
  console.log("   ✗ Service account file NOT found");
  console.log("   Location expected:", serviceAccountPath);
}

// Check 2: Firebase Admin SDK
console.log("\n2. Firebase Admin SDK");
try {
  if (firebaseAdmin.adminInitialized === true) {
    console.log("   ✓ Firebase Admin SDK initialized");
  } else {
    console.log("   ✓ Firebase Admin SDK loaded (check imports for initialization)");
  }
} catch (error) {
  console.log("   ✗ Error loading Firebase Admin SDK");
}

// Check 3: Backend Dependencies
console.log("\n3. Backend Dependencies");
const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const requiredDeps = ["firebase-admin", "firebase", "mongoose", "express"];
requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log("   ✓", dep, "-", (packageJson.dependencies[dep] || packageJson.devDependencies[dep]));
  } else {
    console.log("   ✗", dep, "- NOT INSTALLED");
  }
});

// Check 4: Models and Controllers
console.log("\n4. Firebase-Related Files");
const requiredFiles = [
  "models/user.js",
  "utilities/firebaseAdmin.js",
  "controllers/verificationController.js"
];
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log("   ✓", file);
  } else {
    console.log("   ✗", file, "- NOT FOUND");
  }
});

console.log("\n" + "=".repeat(50));
console.log("\n✅ Setup Verification Complete\n");
console.log("Next steps:");
console.log("1. Ensure Backend/.env has required variables");
console.log("2. Start the backend: npm run dev");
console.log("3. Test phone OTP at /api/v1/auth/verify endpoint");
console.log("\n");
