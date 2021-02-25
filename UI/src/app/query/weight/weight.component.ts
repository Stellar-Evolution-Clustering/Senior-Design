import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  @Input() public weightAttributes: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
