import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: 'ROTFEAT 服务状态',
  links: [],
}

const workerConfig: WorkerConfig = {
  monitors: [
    {
      id: 'fabrapid_main',
      name: 'www.fabrapid.com',
      method: 'GET',
      target: 'https://www.fabrapid.com/',
      statusPageLink: 'https://www.fabrapid.com/',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'fabrapid_3d_tools',
      name: '3d-tools.fabrapid.com',
      method: 'GET',
      target: 'https://3d-tools.fabrapid.com/',
      statusPageLink: 'https://3d-tools.fabrapid.com/',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'hhcnctech_main',
      name: 'hhcnctech.com',
      method: 'GET',
      target: 'https://hhcnctech.com/',
      statusPageLink: 'https://hhcnctech.com/',
      expectedCodes: [200],
      timeout: 10000,
    },
  ],
  notification: {
    timeZone: 'Asia/Shanghai',
    skipErrorChangeNotification: true,
  },
}

const maintenances: MaintenanceConfig[] = []
export { maintenances, pageConfig, workerConfig }
