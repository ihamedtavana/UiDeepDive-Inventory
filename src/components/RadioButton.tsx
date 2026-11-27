import offIcon from '../assets/design-system/warehouse-radio-off.svg'
import onIcon from '../assets/design-system/warehouse-radio-on.svg'

export function RadioButton({ isSelected = false }: { isSelected?: boolean }) {
  return <img className="warehouse-radio-indicator" src={isSelected ? onIcon : offIcon} alt="" width={20} height={20} />
}
