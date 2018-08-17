import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ResourceService } from '../resource.service';
import { Resource } from '../resource';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {

  @Input() resource: Resource;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadResource();
  }

  loadResource(): void {
    const code = +this.route.snapshot.paramMap.get('code');
    this.resourceService.getResource(code)
      .subscribe(resource => this.resource = resource);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.resourceService.updateResource(this.resource)
      .subscribe(() => this.goBack());
  }

}
