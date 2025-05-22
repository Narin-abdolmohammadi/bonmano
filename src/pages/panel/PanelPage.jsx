import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const PanelPage = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <div style={{maxWidth: 600, margin: '48px auto', padding: 0}}>
            <div style={{background: 'linear-gradient(135deg, #e3f2fd 60%, #f7fafd 100%)', borderRadius: 18, boxShadow: '0 4px 24px #e3f2fd', padding: '40px 32px 32px 32px', textAlign: 'center'}}>
                <h1 style={{color: '#1998d2', marginBottom: 18, letterSpacing: 1}}>به پنل مدیریت خوش آمدید</h1>
                <p style={{marginBottom: 32, color: '#333'}}>سلام <span style={{color:'#1998d2', fontWeight:'bold'}}>{user?.name || 'ادمین'}</span>! از اینجا می‌توانید بخش‌های مختلف سایت را مدیریت کنید.</p>
                <div style={{display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap'}}>
                    <button onClick={() => navigate('/panel/users')} style={{background: '#1998d2', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #e3f2fd', transition: 'background 0.2s'}} onMouseOver={e => e.currentTarget.style.background='#127bb8'} onMouseOut={e => e.currentTarget.style.background='#1998d2'}>مدیریت کاربران</button>
                    <button onClick={() => navigate('/panel/products')} style={{background: '#1998d2', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #e3f2fd', transition: 'background 0.2s'}} onMouseOver={e => e.currentTarget.style.background='#127bb8'} onMouseOut={e => e.currentTarget.style.background='#1998d2'}>مدیریت محصولات</button>
                </div>
    
            </div>
        </div>
    )
}

export default PanelPage;