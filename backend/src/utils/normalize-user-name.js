import { capitalize } from '@brazilian-utils/brazilian-utils';

export function normalizeUserName({ name }) {
    return capitalize(name.trim().replaceAll("  ", " "))
}