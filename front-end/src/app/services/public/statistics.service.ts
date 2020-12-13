import { Injectable } from '@angular/core';
import { StatisticsData } from '../../data/public/statistics';
import { ExitPollData } from '../../data/public/exitpoll';
import { TerritorialCountsData } from '../../data/public/territorialCounts';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() { }

  getData(): any{
    return StatisticsData;
  }

  getExitPollData(): any{
    return ExitPollData;
  }

  getTerritorialCountsData(): any{
    return TerritorialCountsData;
  }

}
