import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import dayjs from 'dayjs';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticService } from '../../../services/statistic.service';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  templateUrl: './graph.component.html',
  standalone: true,
  imports: [
    BaseChartDirective,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
  ],
  selector: 'app-graph',
})
export class GraphComponent implements OnInit {
  data: ChartConfiguration<'bar'>['data'] = {
    labels: ['14/06/2024', '15/06/2024', '16/06/2024'],
    datasets: [
      {
        data: [10, 20, 30],
        label: 'Kg',
      },
    ],
  };
  options: ChartConfiguration<'bar'>['options'] = {};

  form: FormGroup;
  error = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly statisticService: StatisticService
  ) {
    this.form = this.fb.group({
      start: [dayjs().subtract(1, 'week').format('YYYY-MM-DD')],
      end: [dayjs().format('YYYY-MM-DD')],
      type: ['volume'],
    });
  }

  ngOnInit(): void {
    this.getGraphData();

    this.form.valueChanges.subscribe((val) => {
      this.getGraphData();
    });
  }

  getGraphData() {
    this.statisticService
      .getGraphData(this.form.value.start, this.form.value.end, this.type)
      .subscribe({
        next: (result) => {
          this.data.labels = result.date;
          this.data.datasets[0].data = result.data;
          this.data.datasets[0].label = this.label;

          this.data = { ...this.data };
        },
        error: (error) => {
          this.error = error.error?.message ?? error.message;
        },
      });
  }

  get maxDate() {
    return dayjs().format('YYYY-MM-DD');
  }

  get total() {
    const total = this.data.datasets[0].data.reduce<number>(
      (result, i) => result + (i as number),
      0
    );

    if (this.type === 'volume' || this.type === 'reps') return total;

    return dayjs().startOf('day').add(total, 'second').format('HH:mm:ss');
  }

  get type() {
    return this.form.value.type;
  }

  onChangeType(type: 'volume' | 'reps' | 'time') {
    this.form.get('type')?.setValue(type);
  }

  get label() {
    if (this.type === 'volume') return 'kg';
    if (this.type === 'reps') return 'reps';
    if (this.type === 'time') return 'seconds';

    return '';
  }
}
