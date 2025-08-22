
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out'
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!fullName || !email || !phone || !message) {
                alert('الرجاء ملء جميع الحقول المطلوبة');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('الرجاء إدخال بريد إلكتروني صحيح');
                return;
            }

            // Phone validation
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                alert('الرجاء إدخال رقم هاتف صحيح');
                return;
            }

            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.remove('d-none');
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('d-none');
                }, 5000);
            }
        });
    }

    // Planet data for modals
    const planetsData = {
        mercury: {
            name: 'عطارد',
            diameter: '4,879 كم',
            distance: '57.9 مليون كم',
            moons: '0',
            description: 'عطارد هو أصغر كواكب المجموعة الشمسية وأقربها إلى الشمس. يكمل دورة حول الشمس في 88 يومًا فقط. سطح عطارد مغطى بالفوهات ويشبه سطح القمر.',
            temperature: 'يتراوح بين -173°C و 427°C'
        },
        venus: {
            name: 'الزهرة',
            diameter: '12,104 كم',
            distance: '108.2 مليون كم',
            moons: '0',
            description: 'الزهرة هو ثاني كوكب من حيث القرب من الشمس ويشبه الأرض في الحجم والتركيب. يتميز بجو كثيف ودرجات حرارة مرتفعة جدًا تصل إلى 462°C.',
            temperature: 'حوالي 462°C'
        },
        earth: {
            name: 'الأرض',
            diameter: '12,742 كم',
            distance: '149.6 مليون كم',
            moons: '1',
            description: 'الأرض هو كوكبنا الوحيد المعروف بوجود الحياة عليه. يتميز بوجود الماء بكميات كبيرة وغلاف جوي مناسب للحياة. يبلغ عمر الأرض حوالي 4.5 مليار سنة.',
            temperature: 'متوسط 15°C'
        },
        mars: {
            name: 'المريخ',
            diameter: '6,779 كم',
            distance: '227.9 مليون كم',
            moons: '2',
            description: 'المريخ هو رابع كوكب من الشمس ويُعرف بالكوكب الأحمر بسبب لون سطحه. يحتوي على أكبر بركان في المجموعة الشمسية (جبل أوليمبوس) وأعمق وادٍ (وادي مارينر).',
            temperature: 'يتراوح بين -143°C و 35°C'
        },
        jupiter: {
            name: 'المشتري',
            diameter: '139,820 كم',
            distance: '778.5 مليون كم',
            moons: '79',
            description: 'المشتري هو أكبر كواكب المجموعة الشمسية وكتلته أكبر من جميع الكواكب الأخرى مجتمعة. يتميز بوجود البقعة الحمراء العظيمة وهي عاصفة ضخمة تستمر منذ مئات السنين.',
            temperature: 'حوالي -108°C'
        },
        saturn: {
            name: 'زحل',
            diameter: '116,460 كم',
            distance: '1.4 مليار كم',
            moons: '82',
            description: 'زحل هو ثاني أكبر كوكب في المجموعة الشمسية ويشتهر بحلقاته المذهلة المكونة من الجليد والصخور. كثافة زحل أقل من الماء مما يعني أنه يمكن أن يطفو إذا وجد محيط كبير بما يكفي.',
            temperature: 'حوالي -139°C'
        },
        uranus: {
            name: 'أورانوس',
            diameter: '50,724 كم',
            distance: '2.9 مليار كم',
            moons: '27',
            description: 'أورانوس هو سابع كوكب من الشمس ويميل على جانبه بزاوية 98 درجة مما يجعله فريدًا بين الكواكب. لونه أزرق مخضر بسبب وجود غاز الميثان في غلافه الجوي.',
            temperature: 'حوالي -197°C'
        },
        neptune: {
            name: 'نبتون',
            diameter: '49,244 كم',
            distance: '4.5 مليار كم',
            moons: '14',
            description: 'نبتون هو أبعد كوكب معروف في المجموعة الشمسية. يتميز بلونه الأزرق الداكن ورياحه الشديدة التي تعد الأسرع في المجموعة الشمسية حيث تصل سرعتها إلى 2100 كم/ساعة.',
            temperature: 'حوالي -201°C'
        }
    };

    // Update modals with planet data
    Object.keys(planetsData).forEach(planetKey => {
        const modal = document.getElementById(`${planetKey}Modal`);
        if (modal) {
            const planet = planetsData[planetKey];

            // Update modal title
            const modalTitle = modal.querySelector('.modal-title');
            if (modalTitle) modalTitle.textContent = planet.name;

            // Update modal body
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.innerHTML = `
                    <p><strong>القطر:</strong> ${planet.diameter}</p>
                    <p><strong>المسافة عن الشمس:</strong> ${planet.distance}</p>
                    <p><strong>عدد الأقمار:</strong> ${planet.moons}</p>
                    <p><strong>درجة الحرارة:</strong> ${planet.temperature}</p>
                    <p>${planet.description}</p>
                `;
            }
        }
    });
});
