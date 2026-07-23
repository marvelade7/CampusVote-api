document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Theme Toggling Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check local storage for preference, default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.innerText = '☀️';
        themeToggleBtn.innerHTML = '<span id="theme-icon">☀️</span> Light Mode';
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<span id="theme-icon">🌙</span> Dark Mode';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<span id="theme-icon">☀️</span> Light Mode';
        }
    });


    
    // --- 1. Copy to Clipboard Functionality ---
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-clipboard');
            
            // Try using the modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(() => showToast());
            } else {
                // Fallback for older browsers or non-HTTPS
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "absolute";
                textArea.style.left = "-999999px";
                document.body.prepend(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast();
                } catch (error) {
                    console.error("Failed to copy text", error);
                } finally {
                    textArea.remove();
                }
            }

            // Visual feedback on the button itself
            const originalText = btn.innerText;
            btn.innerText = 'Copied!';
            btn.style.color = '#10b981';
            btn.style.borderColor = 'rgba(16, 185, 129, 0.5)';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 2000);
        });
    });

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }


    // --- 2. Tab Switching Logic for Code Panels ---
    const codePanes = document.querySelectorAll('.code-pane');

    codePanes.forEach(pane => {
        const tabs = pane.querySelectorAll('.tab');
        const contents = pane.querySelectorAll('.tab-content');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs & contents in THIS pane
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => {
                    c.classList.remove('active');
                    c.style.display = 'none';
                });

                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                contents[index].classList.add('active');
                
                // Add a tiny animation when switching
                contents[index].style.display = 'block';
                contents[index].animate([
                    { opacity: 0, transform: 'translateY(5px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 200,
                    easing: 'ease-out'
                });
            });
        });
    });


    // --- 3. ScrollSpy (Active Sidebar Links) ---
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust offset to trigger when section is in the upper middle of the screen
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });
});
