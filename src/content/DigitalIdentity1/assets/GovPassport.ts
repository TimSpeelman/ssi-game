import { addYears, format, subYears } from 'date-fns';
import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { StringProp } from '../../../model/content/Common/Prop/StringProp';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { getRandomDate, getRandomInList, getRandomInt, getRandomString } from '../../../util/util';
import { dutchPlacesSample } from '../common/dutchPlacesSample';
import { CommonProps } from '../common/props';
import { translations } from '../intl/dictionaries';

const today = new Date();
const dateFormat = (d: Date) => format(d, 'dd-MM-yyyy');
const defaultDateOfBirthRange = [new Date('1940-01-01'), new Date('2010-12-31')];
const defaultDateOfIssuanceRange = [subYears(today, 10), today];
const defaultDateOfExpiryRange = [today, addYears(today, 10)];

const Schema = new AssetSchema({
    typeName: 'GovPassport',
    kindName: 'Physical',
    title: {
        NL: 'Paspoort',
        EN: 'Passport',
    },
    image: { type: 'fa-icon', name: 'passport' },
    props: {
        subject: CommonProps.subject,
        name: new StringProp({ title: translations.name }),
        firstName: new StringProp({ title: translations.firstName }),
        identifier: new StringProp({
            title: translations.identifier,
            helperText: {
                NL: 'In Nederland is dit het Burgerservicenummer (BSN)',
                EN: 'In the Netherlands, this is the Burgerservicenummer (BSN)',
            },
            default: () => sampleInvalidBSN(),
        }),
        dateOfBirth: new StringProp({
            title: translations.dateOfBirth,
            default: () => sampleDateOfBirth(),
            required: true,
        }),
        placeOfIssuance: new StringProp({ title: translations.placeOfIssuance, default: () => sampleDutchPlace() }),
        placeOfBirth: new StringProp({ title: translations.placeOfBirth, default: () => sampleDutchPlace() }),
        dateOfIssuance: new StringProp({
            title: translations.dateOfIssuance,
            default: () => sampleDateOfIssuance(),
        }),
        dateOfExpiry: new StringProp({
            title: translations.dateOfExpiry,
            default: () => sampleDateOfExpiry(),
        }),
        height: new StringProp({
            title: translations.height,
            default: () => sampleHeight(),
        }),
        documentNumber: new StringProp({
            title: translations.documentNumber,
            default: () => sampleInvalidDocumentNumber(),
        }),
        nationality: new StringProp({ title: translations.nationality, default: 'Nederlandse' }),
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class GovPassport extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            title: {
                EN: `Passport of ${this.defProps.firstName} ${this.defProps.name}`,
                NL: `Paspoort van ${this.defProps.firstName} ${this.defProps.name}`,
            },

            transferrable: true,
            cloneable: false,
        };
    }
}

export const GovPassportType = new AssetType(Schema, (id, props, isInitial) => new GovPassport(id, props, isInitial));

function sampleDutchPlace() {
    return getRandomInList(dutchPlacesSample)!;
}

function sampleValidBSN(d: string) {
    return (
        d.length === 9 &&
        (9 * parseInt(d[0]) +
            8 * parseInt(d[1]) +
            7 * parseInt(d[2]) +
            6 * parseInt(d[3]) +
            5 * parseInt(d[4]) +
            4 * parseInt(d[5]) +
            3 * parseInt(d[6]) +
            2 * parseInt(d[7]) +
            -1 * parseInt(d[8])) %
            11 ===
            0
    );
}

/** To prevent suggesting a real BSN, we only generate invalid BSNs */
const sampleInvalidBSN = (): string => {
    while (true) {
        const bsn = `${getRandomInt(100000000, 999999999)}`;
        if (!sampleValidBSN(bsn)) return bsn;
    }
};

function sampleDateOfBirth() {
    return dateFormat(getRandomDate(defaultDateOfBirthRange[0], defaultDateOfBirthRange[1]));
}

function sampleDateOfIssuance() {
    return dateFormat(getRandomDate(defaultDateOfIssuanceRange[0], defaultDateOfIssuanceRange[1]));
}

function sampleDateOfExpiry() {
    return dateFormat(getRandomDate(defaultDateOfExpiryRange[0], defaultDateOfExpiryRange[1]));
}

function sampleHeight() {
    return `${getRandomInt(145, 205) / 100}m`.replace('.', ',');
}

/** To prevent suggesting a real Document Number, we only generate invalid Document Numbers */
function sampleInvalidDocumentNumber() {
    const validNr = getRandomString(9, 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'.split('')); // Note: letter 'O' is not part of document number
    const randomIndex = getRandomInt(0, 8);
    const invalidNr = validNr
        .split('')
        .map((char, index) => (index === randomIndex ? 'O' : char))
        .join('');
    return invalidNr;
}
