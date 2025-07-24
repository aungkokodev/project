import { formatNumber } from "@/utils/formatHelper";

function Price({ value, className }) {
    return <span className={className}>K{formatNumber(value)}</span>;
}

export default Price;
