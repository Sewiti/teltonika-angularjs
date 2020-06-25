import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';


const DEFAULT_MONTH_NAMES = {
    long: [
        'Sausis', 'Vasaris',   'Kovas',    'Balandis', 'Gegužė',    'Birželis',
        'Liepa',  'Rugpjūtis', 'Rugsėjis', 'Spalis',   'Lapkritis', 'Gruodis'
    ],
    short: ['Sau', 'Vas', 'Kov', 'Bal', 'Geg', 'Bir', 'Lie', 'Rugp', 'Rugs', 'Spa', 'Lap', 'Gru'],
    narrow: ['S', 'V', 'K', 'B', 'G', 'B', 'L', 'R', 'R', 'S', 'L', 'G']
};

const DEFAULT_DAY_OF_WEEK_NAMES = {
    long: ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'],
    short: ['Sek', 'Pir', 'Ant', 'Tre', 'Ket', 'Pen', 'Šeš'],
    narrow: ['S', 'P', 'A', 'T', 'K', 'P', 'Š']
};

const DEFAULT_DATE_NAMES = [ '1',  '2',  '3',  '4',  '5',  '6',  '7',  '8',  '9', '10',
                            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];


@Injectable()
export class LithuanianDateAdapter extends NativeDateAdapter {
    getFirstDayOfWeek() { return 1; }

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        return DEFAULT_MONTH_NAMES[style];
    }

    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    }

    getDateNames(): string[] {
        return DEFAULT_DATE_NAMES;
    }
}

