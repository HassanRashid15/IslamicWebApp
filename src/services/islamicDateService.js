// Islamic Date Service for calculating Hijri dates and special occasions

class IslamicDateService {
  constructor() {
    this.hijriMonths = [
      'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
      'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
      'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
    ];
  }

  // Convert Gregorian date to Hijri (approximate calculation)
  gregorianToHijri(gregorianDate) {
    const date = new Date(gregorianDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Approximate Hijri calculation
    let hYear, hMonth, hDay;
    
    if (year > 0) {
      hYear = Math.floor((year - 622) * 33 / 32) + 1;
      const yearOffset = (year - 622) * 365.25 + (month - 1) * 30.44 + day;
      const hijriOffset = hYear * 354.37 + 1;
      const remainingDays = yearOffset - hijriOffset;
      
      hMonth = Math.floor(remainingDays / 29.53) + 1;
      hDay = Math.floor(remainingDays % 29.53) + 1;
      
      // Adjust for month overflow
      if (hMonth > 12) {
        hMonth = 1;
        hYear++;
      }
      if (hDay > 30) {
        hDay = 1;
        hMonth++;
        if (hMonth > 12) {
          hMonth = 1;
          hYear++;
        }
      }
    }

    return {
      day: hDay,
      month: hMonth,
      year: hYear,
      monthName: this.hijriMonths[hMonth - 1],
      formatted: `${hDay} ${this.hijriMonths[hMonth - 1]} ${hYear} AH`
    };
  }

  // Get current Islamic date
  getCurrentIslamicDate() {
    return this.gregorianToHijri(new Date());
  }

  // Check for special Islamic occasions
  getSpecialOccasion(hijriDate) {
    const { day, month } = hijriDate;
    
    // Major Islamic occasions
    const occasions = {
      // Ramadan
      '1:Ramadan': { name: 'First Day of Ramadan', type: 'ramadan', importance: 'high' },
      '21:Ramadan': { name: 'Lailatul Qadr Begins', type: 'ramadan', importance: 'high' },
      '27:Ramadan': { name: 'Lailatul Qadr', type: 'ramadan', importance: 'high' },
      '29:Ramadan': { name: 'Last Day of Ramadan', type: 'ramadan', importance: 'high' },
      
      // Shawwal (Eid al-Fitr)
      '1:Shawwal': { name: 'Eid al-Fitr', type: 'eid', importance: 'high' },
      
      // Dhu al-Hijjah (Hajj and Eid al-Adha)
      '8:Dhu al-Hijjah': { name: 'First Day of Hajj', type: 'hajj', importance: 'high' },
      '9:Dhu al-Hijjah': { name: 'Day of Arafah', type: 'hajj', importance: 'high' },
      '10:Dhu al-Hijjah': { name: 'Eid al-Adha', type: 'eid', importance: 'high' },
      '11:Dhu al-Hijjah': { name: 'Eid Days', type: 'eid', importance: 'medium' },
      '12:Dhu al-Hijjah': { name: 'Eid Days', type: 'eid', importance: 'medium' },
      '13:Dhu al-Hijjah': { name: 'Eid Days', type: 'eid', importance: 'medium' },
      
      // Muharram (Islamic New Year)
      '1:Muharram': { name: 'Islamic New Year', type: 'new_year', importance: 'high' },
      '10:Muharram': { name: 'Day of Ashura', type: 'ashura', importance: 'high' },
      
      // Rabi al-Awwal (Prophet's Birthday)
      '12:Rabi al-Awwal': { name: 'Mawlid al-Nabi', type: 'mawlid', importance: 'medium' },
      
      // Rajab (Sacred month)
      '1:Rajab': { name: 'Beginning of Rajab', type: 'sacred', importance: 'medium' },
      '27:Rajab': { name: 'Isra and Mi\'raj', type: 'miraj', importance: 'high' },
      
      // Sha'ban (Month before Ramadan)
      '15:Sha\'ban': { name: 'Shab e-Barat', type: 'shab_barat', importance: 'medium' },
    };

    const key = `${day}:${month}`;
    return occasions[key] || null;
  }

  // Get content recommendations based on Islamic date
  getContentRecommendations(hijriDate) {
    const occasion = this.getSpecialOccasion(hijriDate);
    const month = hijriDate.monthName;
    
    const recommendations = {
      quranicThemes: [],
      hadithThemes: [],
      inspirationalMessages: [],
      colors: {
        primary: 'emerald',
        secondary: 'teal'
      }
    };

    // Ramadan-specific content
    if (month === 'Ramadan' || occasion?.type === 'ramadan') {
      recommendations.quranicThemes = [
        'fasting', 'patience', 'quran revelation', 'night prayer', 'charity'
      ];
      recommendations.hadithThemes = [
        'ramadan virtues', 'fasting benefits', 'taraweeh', 'laylatul qadr'
      ];
      recommendations.inspirationalMessages = [
        'Ramadan is the month of mercy and forgiveness',
        'The Quran was revealed in this blessed month',
        'Fast with faith and hope for reward'
      ];
      recommendations.colors = { primary: 'emerald', secondary: 'amber' };
    }
    
    // Eid-specific content
    else if (occasion?.type === 'eid') {
      recommendations.quranicThemes = [
        'gratitude', 'celebration', 'community', 'sacrifice', 'faith'
      ];
      recommendations.hadithThemes = [
        'eid celebration', 'charity', 'family gathering', 'prayer'
      ];
      recommendations.inspirationalMessages = [
        'Eid Mubarak! A day of joy and gratitude',
        'Celebrate the blessings of Allah',
        'Share happiness with others'
      ];
      recommendations.colors = { primary: 'amber', secondary: 'orange' };
    }
    
    // Hajj-specific content
    else if (occasion?.type === 'hajj') {
      recommendations.quranicThemes = [
        'pilgrimage', 'unity', 'sacrifice', 'submission', 'forgiveness'
      ];
      recommendations.hadithThemes = [
        'hajj virtues', 'arafah day', 'pilgrimage rites', 'unity of muslims'
      ];
      recommendations.inspirationalMessages = [
        'Hajj is a journey of the heart to Allah',
        'Stand together as one Ummah',
        'Seek forgiveness on this blessed day'
      ];
      recommendations.colors = { primary: 'emerald', secondary: 'blue' };
    }
    
    // Islamic New Year
    else if (occasion?.type === 'new_year') {
      recommendations.quranicThemes = [
        'renewal', 'reflection', 'time', 'accountability', 'new beginnings'
      ];
      recommendations.hadithThemes = [
        'new year reflections', 'time management', 'spiritual renewal'
      ];
      recommendations.inspirationalMessages = [
        'A new year, a new beginning for your soul',
        'Reflect on the past, plan for the future',
        'Make this year count for your hereafter'
      ];
      recommendations.colors = { primary: 'blue', secondary: 'indigo' };
    }
    
    // Default content
    else {
      recommendations.quranicThemes = [
        'faith', 'guidance', 'worship', 'morality', 'wisdom'
      ];
      recommendations.hadithThemes = [
        'daily guidance', 'character', 'prayer', 'charity', 'knowledge'
      ];
      recommendations.inspirationalMessages = [
        'Every day is a new opportunity to grow spiritually',
        'Seek knowledge and practice what you learn',
        'Remember Allah in all your affairs'
      ];
    }

    return {
      ...recommendations,
      occasion,
      isSpecialDay: !!occasion,
      month,
      currentIslamicDate: hijriDate
    };
  }

  // Get prayer time adjustments for special days
  getPrayerTimeAdjustments(hijriDate) {
    const occasion = this.getSpecialOccasion(hijriDate);
    
    if (occasion?.type === 'ramadan') {
      return {
        taraweehRecommended: true,
        suhoorImportant: true,
        iftarImportant: true,
        additionalPrayers: ['Tahajjud', 'Taraweeh']
      };
    }
    
    if (occasion?.type === 'eid') {
      return {
        eidPrayerRecommended: true,
        additionalPrayers: ['Eid Prayer']
      };
    }
    
    return {
      additionalPrayers: []
    };
  }
}

export const islamicDateService = new IslamicDateService();
export default islamicDateService;
