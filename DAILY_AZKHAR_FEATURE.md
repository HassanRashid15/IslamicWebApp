# Daily Azkhar Feature

## Overview
This feature implements a two-step modal system for first-time visitors:
1. **Welcome Modal** - Shows first, with inspirational Quranic verses and quotes
2. **Daily Azkhar Modal** - Shows after welcome modal, allowing users to select daily remembrances

## How It Works

### First Visit Experience
1. User visits the website for the first time
2. **Welcome Modal** appears with beautiful Islamic design, showing:
   - Random Quranic verse with Arabic text and English translation
   - Inspirational Islamic quote
   - "Begin Journey" button to continue
3. After closing welcome modal, **Daily Azkhar Modal** appears with 6 carefully selected daily azkhars
4. User can:
   - Select azkhars they want to focus on (checkbox selection)
   - Navigate through azkhars using Previous/Next buttons
   - Skip selection entirely
   - Continue with or without selections
5. Both modals are then hidden and user proceeds to the main website

### Subsequent Visits
- Both modals are hidden using localStorage and sessionStorage
- Selected azkhars are displayed on home page in a dedicated section
- Users can reset the experience using the "Reset Azkhar" button (bottom-right)

## Components

### 1. DailyAzkharModal (`src/components/DailyAzkharModal.js`)
- Interactive modal with 6 daily azkhars
- Checkbox selection system
- Navigation controls
- Progress indicator
- Skip/Continue options

### 2. WelcomeModal (`src/components/WelcomeModal.js`)
- Modified to show after DailyAzkharModal
- Random Quranic verses and inspirational quotes
- Beautiful Islamic-themed design

### 3. DailyAzkharDisplay (`src/components/DailyAzkharDisplay.js`)
- Shows selected azkhars on home page
- Grid layout with Arabic text, transliteration, translation
- Category badges and benefits

### 4. AzkharContext (`src/contexts/AzkharContext.js`)
- Manages azkhar state across the app
- localStorage integration
- Reset functionality

### 5. AzkharResetButton (`src/components/AzkharResetButton.js`)
- Testing utility to reset the daily azkhar experience
- Located in bottom-right corner

## Storage
- `localStorage.getItem('dailyAzkharShown')` - Tracks if azkhar modal was shown
- `localStorage.getItem('selectedAzkhars')` - Stores selected azkhars as JSON
- `sessionStorage.getItem('welcomeModalShown')` - Tracks welcome modal

## Daily Azkhars Included
1. **Alhamdulillah** - Gratitude to Allah
2. **Subhanallahi wa bihamdihi** - Glory and praise
3. **Astaghfirullaha wa atubu ilayh** - Seeking forgiveness
4. **La ilaha illallah** - Declaration of faith
5. **Allahumma salli 'ala Muhammad** - Salawat upon Prophet
6. **Bismillah protection** - Daily protection dua

## Styling
- Islamic-themed design with emerald/amber color scheme
- Animated backgrounds and transitions
- Responsive design for all screen sizes
- Custom fonts (Amiri for Arabic, Cinzel for headings)

## Integration
- Added to App.js with AzkharProvider
- Integrated into Home.js flow
- Works with existing prayer and authentication systems

## Testing
- Use the "Reset Azkhar" button to test the first-visit experience
- Clear browser localStorage to test fresh installation
- Check console for any errors during modal transitions

## Future Enhancements
- Add more daily azkhars
- Implement time-based azkhar suggestions
- Add audio recitation for azkhars
- Track daily azkhar completion
- Share azkhar selections with community
