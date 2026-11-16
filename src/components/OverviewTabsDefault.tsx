import { Badge } from './Badge'
import { Button } from './Button'
import { Tab } from './Tab'
import calendar from '../assets/top1_imgCalendar.svg'
import upload from '../assets/top1_imgUpload01.svg'

export function OverviewTabsDefault() {
  return <section className="overview-tabs" aria-label="Overview controls">
    <div className="overview-heading"><h2>New York Central</h2><Badge>Synced 2 min ago</Badge></div>
    <div className="overview-controls">
      <div className="date-controls"><div className="date-range"><img className="icon" src={calendar} alt="" /><span>Oct 2 – Oct 31</span></div><span className="vertical-divider" /><Tab /></div>
      <Button size="medium" className="export-button"><img className="icon" src={upload} alt="" />Export</Button>
    </div>
  </section>
}
