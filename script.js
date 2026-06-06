document.addEventListener('DOMContentLoaded', () => {
    // FECHA DE INICIO DE LA RELACIÓN
    const startDate = new Date('2026-01-06T12:56:06');
    document.getElementById('relationship-start').innerText = startDate.toLocaleDateString();

    // --- BACKGROUND MUSIC ---
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;

    backgroundMusic.volume = 0.3;

    musicToggle.addEventListener('click', () => {
        // Agregar efecto de click
        musicToggle.style.transform = 'scale(0.85) rotateZ(20deg)';
        
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '🔇';
            isMusicPlaying = false;
        } else {
            backgroundMusic.play();
            musicToggle.textContent = '🎵';
            isMusicPlaying = true;
        }
        
        setTimeout(() => {
            musicToggle.style.transform = 'scale(1) rotateZ(0deg)';
        }, 200);
    });

    // Intentar reproducir automáticamente (algunos navegadores lo permiten)
    backgroundMusic.play().then(() => {
        isMusicPlaying = true;
        musicToggle.textContent = '🎵';
    }).catch(() => {
        // El navegador no permitió reproducción automática
        isMusicPlaying = false;
        musicToggle.textContent = '🔇';
    });

    const introOverlay = document.getElementById('intro-overlay');
    const startBtn = document.getElementById('start-btn');
    const mainContent = document.getElementById('main-content');
    const particlesContainer = document.getElementById('particles');

    // --- INTRO PARTICLES ---
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'intro-particle';
        p.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            box-shadow: 0 0 10px white;
            animation: moveParticle ${Math.random() * 10 + 5}s infinite linear;
        `;
        particlesContainer.appendChild(p);
    }

    // --- AMBIENT EFFECTS ---
    function createAmbientEffects() {
        const body = document.body;

        // Falling petals/hearts
        setInterval(() => {
            const petal = document.createElement('div');
            petal.className = 'falling-element';
            petal.innerHTML = Math.random() > 0.5 ? '🌸' : '❤️';
            petal.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}vw;
                font-size: ${Math.random() * 20 + 10}px;
                opacity: ${Math.random() * 0.5 + 0.3};
                pointer-events: none;
                z-index: 999;
                user-select: none;
                transform: rotate(${Math.random() * 360}deg);
            `;
            body.appendChild(petal);

            setTimeout(() => {
                petal.style.top = '110vh';
                petal.style.left = (parseFloat(petal.style.left) + (Math.random() * 20 - 10)) + 'vw';
                petal.style.transform = `rotate(${Math.random() * 720}deg)`;
            }, 50);

            setTimeout(() => petal.remove(), 6000);
        }, 1000);

        // Mouse sparkle trail
        window.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.85) {
                const sparkle = document.createElement('div');
                sparkle.className = 'mouse-sparkle';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    width: 4px;
                    height: 4px;
                    background: var(--primary);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    box-shadow: 0 0 10px var(--primary);
                `;
                body.appendChild(sparkle);

                const anim = sparkle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0)`, opacity: 0 }
                ], { duration: 1000, easing: 'ease-out' });

                anim.onfinish = () => sparkle.remove();
            }
        });
    }

    startBtn.addEventListener('click', () => {
        // Agregar efecto de click
        startBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            startBtn.style.transform = 'scale(1)';
        }, 100);
        
        introOverlay.style.opacity = '0';
        setTimeout(() => {
            introOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            window.scrollTo(0, 0);
            initMainAnimations();
            createAmbientEffects();
        }, 1200);
    });

    // --- HERO HEARTS ---
    function createHeroHearts() {
        const container = document.getElementById('hero-hearts');
        const icons = ['heart', 'sparkles', 'star'];
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.innerHTML = `<i data-lucide="${icons[Math.floor(Math.random() * icons.length)]}"></i>`;
            container.appendChild(heart);
            lucide.createIcons();
            setTimeout(() => heart.remove(), 10000);
        }, 1200);
    }

    // --- COUNTDOWN ---
    function updateCountdown() {
        const now = new Date();
        let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
        
        const tempDate = new Date(startDate);
        tempDate.setMonth(tempDate.getMonth() + months);
        
        let timeDiff = now - tempDate;
        
        // Si el tiempo es negativo (aún no hemos llegado al aniversario este mes), restar un mes
        if (timeDiff < 0) {
            months = Math.max(0, months - 1);
            tempDate.setMonth(tempDate.getMonth() - 1);
            timeDiff = now - tempDate;
        }

        const days = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
        const hours = Math.max(0, Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = Math.max(0, Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = Math.max(0, Math.floor((timeDiff % (1000 * 60)) / 1000));

        document.getElementById('months').innerText = Math.max(0, months).toString().padStart(2, '0');
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }
    setInterval(updateCountdown, 1000);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });

    function initMainAnimations() {
        createHeroHearts();
        document.querySelectorAll('.animate-up, .animate-left, .animate-right').forEach(el => {
            observer.observe(el);
        });
    }

    // --- REASONS ---
    const allReasons = [
        { front: "💗 Tu voz", back: "Podría escucharte durante horas sin cansarme jamás." },
        { front: "🌹 Tu existencia", back: "El mundo es un lugar más bonito porque tú estás en él." },
        { front: "☀️ Tus buenos días", back: "Siempre logran alegrar incluso mis mañanas más difíciles." },
        { front: "🌙 Tus buenas noches", back: "Son mi forma favorita de terminar el día." },
        { front: "🫶 Tu cariño", back: "Me hace sentir amado de una manera que nunca imaginé." },
        { front: "💫 Tu manera de amar", back: "Es tan única que me enamora cada día más." },
        { front: "🦋 Tus nervios", back: "Incluso cuando te pones nerviosa me pareces adorable." },
        { front: "🎀 Tu inocencia", back: "Tiene algo que derrite mi corazón por completo." },
        { front: "🌸 Tu dulzura", back: "A veces siento que no existe alguien tan tierna como tú." },
        { front: "💞 Tu confianza", back: "Es uno de los regalos más valiosos que me has dado." },
        { front: "🌷 Tu forma de querer", back: "Me hace sentir especial incluso en los días comunes." },
        { front: "💌 Cada mensaje tuyo", back: "Se convierte en algo que releo más de lo que debería." },
        { front: "🧸 Tu lado adorable", back: "Hace que quiera abrazarte para siempre." },
        { front: "🥰 Tu forma de mirarme", back: "Hace que me olvide del resto del mundo." },
        { front: "🌠 Tus sueños", back: "Me encanta escucharte hablar de todo lo que quieres lograr." },
        { front: "🎇 Tu felicidad", back: "Verte sonreír siempre será una de mis cosas favoritas." },
        { front: "🏡 Tu compañía", back: "Contigo cualquier lugar se siente como hogar." },
        { front: "🍓 Tus ocurrencias", back: "Nunca dejan de sorprenderme y hacerme reír." },
        { front: "💖 Tu sensibilidad", back: "Demuestra el enorme corazón que tienes." },
        { front: "🌼 Tu ternura", back: "Es imposible no enamorarse de ella." },
        { front: "🤍 Tu alma", back: "Es una de las cosas más bonitas que he conocido." },
        { front: "💝 Tus palabras", back: "Tienen el poder de arreglar mis peores días." },
        { front: "🌺 Tu forma de existir", back: "Hace que todo tenga un poco más de color." },
        { front: "🫂 Tus abrazos imaginarios", back: "Incluso pensarlos me hacen sentir mejor." },
        { front: "💍 Lo que sueño contigo", back: "Cada plan futuro se ve más bonito si apareces en él." },
        { front: "🎠 Nuestras conversaciones", back: "Nunca quiero que terminen." },
        { front: "🕊️ Tu tranquilidad", back: "Me da paz incluso cuando mi mente es un caos." },
        { front: "🌈 Tu forma de ver la vida", back: "Me inspira más de lo que imaginas." },
        { front: "💐 Tu presencia", back: "Hace que todo sea más especial sin siquiera intentarlo." },
        { front: "⭐ Tu luz", back: "Siempre encuentra la forma de llegar hasta mí." },
        { front: "💎 Tu valor", back: "Eres mucho más increíble de lo que crees." },
        { front: "🎨 Cada detalle tuyo", back: "Me enamora porque forma la persona que eres." },
        { front: "📖 Tu historia", back: "Quisiera seguir leyendo cada capítulo contigo." },
        { front: "🫀 Lo que provocas en mí", back: "Es imposible explicarlo sin quedarme corto." },
        { front: "🌹 Lo que siento por ti", back: "Crece incluso cuando intento entenderlo." },
        { front: "💘 Tus locuras", back: "Todavía logra sacarme una sonrisa cuando aparece en pantalla." },
        { front: "✨ Tu forma de ser", back: "Es exactamente la razón por la que me enamoré de ti." },
        { front: "🌍 Mi mundo contigo", back: "Se siente más seguro, más cálido y más feliz." },
        { front: "♾️ Tú y solo tú", back: "Porque entre millones de personas, siempre te elegiría a ti." },
        { front: "🫀 La razón número 1", back: "Porque cuando pienso en mi persona favorita, siempre apareces tú." }
    ];

    let displayedReasonsCount = 0;
    const reasonsBatch = 4;
    const reasonsContainer = document.getElementById('reasons-container');
    const loadMoreBtn = document.getElementById('load-more-reasons');

    function renderReasons() {
        const fragment = document.createDocumentFragment();
        const end = Math.min(displayedReasonsCount + reasonsBatch, allReasons.length);
        for (let i = displayedReasonsCount; i < end; i++) {
            const reason = allReasons[i];
            const card = document.createElement('div');
            card.className = 'flip-card animate-up';
            card.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">${reason.front}</div>
                    <div class="flip-card-back">${reason.back}</div>
                </div>
            `;
            card.style.animation = `scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${(i - displayedReasonsCount) * 0.1}s both`;
            card.onclick = () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.classList.toggle('active');
                }, 100);
            };
            fragment.appendChild(card);
            observer.observe(card);
        }
        reasonsContainer.appendChild(fragment);
        displayedReasonsCount = end;
        if (displayedReasonsCount >= allReasons.length) {
            loadMoreBtn.style.animation = 'slideOutDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            setTimeout(() => {
                loadMoreBtn.style.display = 'none';
            }, 300);
        }
        lucide.createIcons();
    }

    loadMoreBtn.addEventListener('click', () => {
        // Agregar efecto de click
        loadMoreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            loadMoreBtn.style.transform = 'scale(1)';
        }, 100);
        
        renderReasons();
    });
    renderReasons();

    // --- HIDDEN MESSAGES ---
    const messages = ["Eres increíble ❤️", "Te quiero tanto ✨", "Gracias por existir 😍", "Eres mi sol ☀️", "Besos para ti 💋", "Mi lugar favorito es contigo 🏠", "Siempre juntos 👩‍❤️‍👨"];
    function createHiddenTrigger() {
        const layer = document.getElementById('hidden-messages-layer');
        for (let i = 0; i < 15; i++) {
            const trigger = document.createElement('div');
            trigger.className = 'hidden-trigger';
            const randomTop = Math.random() * 80 + 10;
            const randomLeft = Math.random() * 90 + 5;
            trigger.style.top = randomTop + '%';
            trigger.style.left = randomLeft + '%';
            trigger.innerHTML = '<i data-lucide="heart"></i>';
            trigger.style.pointerEvents = 'all';
            
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const rect = trigger.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                showToast(messages[Math.floor(Math.random() * messages.length)], x, y);
            });
            
            layer.appendChild(trigger);
        }
        lucide.createIcons();
    }
    createHiddenTrigger();

    function showToast(msg, x, y) {
        const toast = document.createElement('div');
        toast.className = 'floating-toast';
        toast.innerText = msg;
        toast.style.cssText = `
            position: fixed; left: ${x}px; top: ${y}px;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark)); 
            color: white; padding: 8px 20px;
            border-radius: 25px; font-size: 0.85rem; font-weight: 600;
            pointer-events: none; z-index: 1000; 
            animation: toastFloat 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            box-shadow: 0 5px 20px rgba(255, 183, 197, 0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    // --- SURPRISE ---
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseOverlay = document.getElementById('surprise-overlay');
    const surpriseText = document.getElementById('surprise-text');
    const finalMsg = `Felices 5 meses, mi niña hermosha. ❤️

Sinceramente, no sé por dónde empezar porque siento tantas cosas por ti que las palabras siempre se me quedan cortas.

Hace 5 meses llegaste a mi vida y, aunque en ese momento no podía imaginar todo lo que iba a pasar entre nosotros, hoy puedo decir con total seguridad que conocerte fue una de las cosas más hermosas que me han sucedido.

Mi niña bonita, gracias por existir.

Gracias por cada conversación, por cada risa, por cada momento donde estuviste conmigo incluso cuando no era fácil. Gracias por cada mensaje que me sacó una sonrisa cuando estaba triste, por cada vez que me escuchaste, por cada vez que me apoyaste y por cada vez que me hiciste sentir amado.

No sé si alguna vez te das cuenta del efecto que tienes en mí, pero desde que apareciste muchas cosas cambiaron. Mis días se volvieron más bonitos, mis problemas más llevaderos y mi corazón encontró un lugar donde sentirse tranquilo.

Mi bb, amo tantas cosas de ti que podría pasarme horas escribiéndolas.

Amo tu sonrisa porque tiene la capacidad de alegrarme incluso cuando estoy pasando por un mal momento.

Amo tu mirada porque cada vez que la veo siento algo que no sé explicar.

Amo tu cabello, tu voz, tu forma de hablar, tus ocurrencias, tus bromas, tu forma de preocuparte por las personas que quieres y hasta esas pequeñas cosas que probablemente tú consideras insignificantes.

Amo tu corazón.

Amo la manera en que quieres.

Amo la forma en que haces que me sienta importante.

Amo que seas tú.

Y mientras más te conozco, más razones encuentro para seguir enamorándome.

Mi reina, gracias por dejarme conocer a la persona increíble que eres.

Gracias por confiar en mí.

Gracias por abrirme tu corazón.

Gracias por permitirme estar a tu lado durante estos meses.

Porque créeme, para mí cada recuerdo contigo vale muchísimo.

Guardo con cariño nuestras conversaciones, nuestras bromas, nuestros momentos tiernos, nuestros momentos felices y hasta las veces en las que tuvimos problemas y logramos seguir adelante.

Porque todo eso forma parte de nuestra historia.

Y nuestra historia es una de mis cosas favoritas.

Mi niña hermosha, quiero que sepas algo.

No te amo solamente por los momentos bonitos.

Te amo por quien eres.

Te amo cuando estás feliz.

Te amo cuando estás triste.

Te amo cuando te sientes fuerte.

Y te amo incluso cuando dudas de ti misma.

Porque para mí sigues siendo esa persona maravillosa que logró conquistar mi corazón sin siquiera darse cuenta.

Si pudiera pedir un deseo, sería seguir creando recuerdos contigo.

Seguir escuchando tu voz.

Seguir viendo tu sonrisa.

Seguir conociéndote cada día más.

Seguir viviendo con tus locuras.

Seguir acompañándote mientras cumples cada uno de tus sueños.

Seguir estando ahí cuando necesites a alguien.

Porque sinceramente, mi lugar favorito siempre termina siendo aquel donde estás tú.

Mi todo, gracias por estos 5 meses tan hermosos.

Gracias por cada segundo.

Gracias por cada sentimiento.

Gracias por cada recuerdo.

Y gracias por permitirme amarte.
Se que aun no somos nada oficial, pero para mí ya eres alguien muy importante y cada día que pasa me doy cuenta de lo mucho que significas para mí.

No sé qué nos deparará el futuro, pero sí sé algo:

Si volviera al día en que te conocí, volvería a elegirte una y otra y otra vez.

Porque entre todas las personas del mundo, mi corazón sigue encontrando su lugar favorito en ti.

Te amo muchísimo, mi niña bonita.

Te amo más de lo que puedo escribir.

Te amo más de lo que puedo explicar.

Y te prometo que cada día voy a seguir encontrando nuevas razones para hacerlo.

Felices 5 meses, mi niña hermosha. 🥺💗✨`;

    let confettiInterval;
    let typeWriterTimeout;
    let surpriseSeen = false;

    function startTypeWriter() {
        let i = 0;
        surpriseText.innerHTML = '';
        document.getElementById('skip-animation').style.display = 'block'; // Mostrar botón al empezar animación
        const surpriseMessageBox = document.querySelector('.surprise-message-box');
        function typeFinal() {
            if (i < finalMsg.length) {
                surpriseText.innerHTML += finalMsg.charAt(i);
                i++;
                if (surpriseMessageBox) {
                    surpriseMessageBox.scrollTop = surpriseMessageBox.scrollHeight;
                }
                typeWriterTimeout = setTimeout(typeFinal, 40);
            } else {
                // Animación terminó, ocultar botón de saltar
                document.getElementById('skip-animation').style.display = 'none';
            }
        }
        typeFinal();
    }

    surpriseBtn.addEventListener('click', () => {
        surpriseOverlay.classList.remove('hidden');
        startConfetti();
        
        // Limpiar cualquier timeout anterior
        if (typeWriterTimeout) {
            clearTimeout(typeWriterTimeout);
            typeWriterTimeout = null;
        }
        
        const skipBtn = document.getElementById('skip-animation');
        
        if (surpriseSeen) {
            // Si ya se vio, mostrar el mensaje completo sin animación
            surpriseText.innerHTML = finalMsg;
            skipBtn.style.display = 'none';
        } else {
            // Primera vez: hacer la animación
            skipBtn.style.display = 'none';
            startTypeWriter();
        }
    });

    document.getElementById('close-surprise').addEventListener('click', () => {
        // Agregar efecto de click
        const closeBtn = document.getElementById('close-surprise');
        closeBtn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            closeBtn.style.transform = 'scale(1)';
        }, 100);
        
        // Agregar animación de salida suave
        const messageBox = document.querySelector('.surprise-message-box');
        messageBox.style.animation = 'slideOutDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
            surpriseOverlay.classList.add('hidden');
            messageBox.style.animation = '';
            surpriseSeen = true;
            
            // Limpiar el timeout del typewriter
            if (typeWriterTimeout) {
                clearTimeout(typeWriterTimeout);
                typeWriterTimeout = null;
            }
            
            if (confettiInterval) {
                clearInterval(confettiInterval);
                confettiInterval = null;
            }
        }, 500);
    });

    document.getElementById('skip-animation').addEventListener('click', () => {
        // Agregar efecto de click
        const skipBtn = document.getElementById('skip-animation');
        skipBtn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            skipBtn.style.transform = 'scale(1)';
        }, 100);
        
        // Detener la animación de escritura
        if (typeWriterTimeout) {
            clearTimeout(typeWriterTimeout);
            typeWriterTimeout = null;
        }
        // Mostrar todo el mensaje
        surpriseText.innerHTML = finalMsg;
        const surpriseMessageBox = document.querySelector('.surprise-message-box');
        if (surpriseMessageBox) {
            surpriseMessageBox.scrollTop = 0;
        }
        skipBtn.style.animation = 'slideOutDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    });


    function startConfetti() {
        const canvas = document.getElementById('surprise-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * 10,
                color: `hsl(${Math.random() * 360}, 100%, 80%)`
            });
        }
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = p.color;
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
                ctx.fill();
            });
            updateConfetti();
        }
        function updateConfetti() {
            particles.forEach(p => {
                p.y += Math.cos(p.d) + 1.5 + p.r / 2;
                p.x += Math.sin(p.d) * 1.5;
                if (p.y > canvas.height) {
                    p.y = -10;
                    p.x = Math.random() * canvas.width;
                }
            });
        }
        if (confettiInterval) clearInterval(confettiInterval);
        confettiInterval = setInterval(draw, 30);
    }
});
