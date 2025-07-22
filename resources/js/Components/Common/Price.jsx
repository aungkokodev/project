import { formatNumber } from "@/utils/formatHelper";

function Price({ value, className }) {
    return <p className={className}>K{formatNumber(value)}</p>;
}

export default Price;
