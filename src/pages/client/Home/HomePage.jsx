import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  // این تابع رو بعداً با چک کردن واقعی ادمین جایگزین کنید
  const isAdmin = () => {
    // اینجا باید چک کنید که کاربر ادمین هست یا نه
    // مثلاً از localStorage یا context یا API استفاده کنید
    return localStorage.getItem('isAdmin') === 'true';
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <div className={theme === 'dark' ? styles.darkHomeContainer : styles.homeContainer}>
      <div className={styles.topButtons}>
        <button 
          className={styles.userPanelButton}
          onClick={handleAuthClick}
        >
          <span className={styles.userIcon}></span>
          ورود / ثبت نام
        </button>

        <button 
          className={styles.themeToggle}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙' : '☀️'} 
          {theme === 'light' ? 'حالت شب' : 'حالت روز'}
        </button>
      </div>

      <div className={styles.heroSection}>
        <h1 className={styles.mainTitle}>به فروشگاه بونمانو خوش آمدید</h1>
        <p className={styles.subtitle}>بهترین محصولات با بهترین قیمت‌ها</p>
      </div>
      
      <div className={styles.featuresSection}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🚚</div>
          <h3>ارسال سریع</h3>
          <p>ارسال به سراسر کشور</p>
        </div>
        
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>⭐</div>
          <h3>کیفیت عالی</h3>
          <p>تضمین اصالت کالا</p>
        </div>
        
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>💎</div>
          <h3>قیمت مناسب</h3>
          <p>بهترین قیمت‌های بازار</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;