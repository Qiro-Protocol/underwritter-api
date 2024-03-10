import { prisma } from "@/utils";
import axios from "axios";

export type serviceData = {
  serviceId: number;
  companyId: number;
  url: string;
};

export async function fetchData(job: serviceData) {
  const { serviceId, companyId, url } = job;

  try {
    const response = await axios.get(url);
    const data = response.data;

    await prisma.service.update({
      where: {
        id: serviceId,
        companyId: companyId,
      },
      data: {
        extraData: data,
      },
    });
    console.log("DONE");
  } catch (error) {
    console.error(`Error processing job ${serviceId}:`, error);
  }
}
