"use server";

export async function getServiceID() {
  return process.env.VITE_EMAIL_SERVICE_ID;
}

export async function getTemplateID() {
  return process.env.VITE_EMAIL_TEMPLATE_ID;
}

export async function getUserID() {
  return process.env.VITE_EMAIL_PUBLIC_KEY;
}
