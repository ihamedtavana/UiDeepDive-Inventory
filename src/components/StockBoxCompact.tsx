import { StockBox } from './StockBox'

export function StockBoxCompact({ onHand }: { onHand: number }) {
  return <StockBox isCompact width={112} state="full" onHand={onHand} adding={0} className="stock-box-compact" />
}
