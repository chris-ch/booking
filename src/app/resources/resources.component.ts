import { Component, OnInit } from '@angular/core';
import { Resource } from '../resource';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resources: Resource[];

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.loadResources();
  }

  loadResources(): void {
    this.resourceService.getResources()
      .subscribe(resources => this.resources = resources);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.resourceService.addResource({ name } as Resource)
      .subscribe(resource => {
        this.resources.push(resource);
      });
  }

  delete(resource: Resource): void {
    this.resources = this.resources.filter(r => r !== resource);
    this.resourceService.deleteResource(resource).subscribe();
  }

}
