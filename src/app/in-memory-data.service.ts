import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const resources = [
      { id: 11, code: 'rsrc01', name: 'Blue room' },
      { id: 12, code: 'rsrc02', name: 'Dark room' },
      { id: 13, code: 'rsrc03', name: 'Printer001' },
      { id: 14, code: 'rsrc04', name: 'Printer002' },
      { id: 15, code: 'rsrc05', name: 'Phone booth 1' },
      { id: 16, code: 'rsrc06', name: 'Phone booth 2' },
      { id: 17, code: 'rsrc07', name: 'Phone booth 3' }
    ];
    return {resources};
  }
}
