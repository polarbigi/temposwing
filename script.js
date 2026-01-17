$(document).ready(function() {
    
    // Header scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.main-header').addClass('scrolled');
        } else {
            $('.main-header').removeClass('scrolled');
        }
    });
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').not('.mailto-link').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('#mobileMenu').removeClass('active');
            $('#mobileOverlay').removeClass('active');
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    // Mobile menu toggle
    $('#menuToggle').on('click', function() {
        $('#mobileMenu').addClass('active');
        $('#mobileOverlay').addClass('active');
    });
    
    $('#menuClose, #mobileOverlay').on('click', function() {
        $('#mobileMenu').removeClass('active');
        $('#mobileOverlay').removeClass('active');
    });
    
    // Fade up on scroll
    function checkFadeUp() {
        $('.fade-up').each(function() {
            const elementTop = $(this).offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();
            if (elementTop < viewportBottom - 100) {
                $(this).addClass('visible');
            }
        });
    }
    $(window).on('scroll', checkFadeUp);
    checkFadeUp();
    
    // Animate counters
    function animateCounters() {
        $('.counter').each(function() {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            if ($this.hasClass('counted')) return;
            
            const elementTop = $this.offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < viewportBottom - 50) {
                $this.addClass('counted');
                $({ count: 0 }).animate({ count: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.count).toLocaleString());
                    },
                    complete: function() {
                        $this.text(target.toLocaleString());
                    }
                });
            }
        });
    }
    $(window).on('scroll', animateCounters);
    animateCounters();
    
    // Scroll progress bar
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var scrollPercent = (scrollTop / docHeight) * 100;
        $('#scrollProgress').css('width', scrollPercent + '%');
    });
    
    // 3D tilt effect on service cards
    $('.service-card').on('mousemove', function(e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 20;
        var rotateY = (centerX - x) / 20;
        $(this).css('transform', 'translateY(-10px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0) rotateX(0) rotateY(0)');
    });
    
    // Magnetic button effect
    $('.btn-gold, .btn-outline-gold, .btn-dark-custom').on('mousemove', function(e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        $(this).css('transform', 'translate(' + (x * 0.1) + 'px, ' + (y * 0.1) + 'px)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translate(0, 0)');
    });
    
    // Dynamic mailto links
    $('.mailto-link').on('click', function(e) {
        e.preventDefault();
        console.log('mailto clicked!', $(this).data('type'));
        
        var type = $(this).data('type');
        var now = new Date();
        var dateStr = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        var timeStr = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        var subject, body;
        
        switch (type) {
            case 'wholesale':
                subject = 'Wholesale Inquiry - ' + dateStr + ' ' + timeStr;
                body = 'Hi,\n\nI am interested in wholesale/business opportunities with Tempo Swing.\n\nBusiness Name:\nContact Name:\nPhone:\nType (Academy/Retailer/Coach):\nEstimated Quantity:\n\nQuestions/Comments:';
                break;
            case 'product':
                subject = 'Product Inquiry - ' + dateStr + ' ' + timeStr;
                body = 'Hi,\n\nI am interested in learning more about the Tempo Swing trainer.\n\nName:\nPhone:\nCurrent Handicap:\n\nQuestions:';
                break;
            default:
                subject = 'General Inquiry - ' + dateStr + ' ' + timeStr;
                body = 'Hi,\n\nI would like more information about Tempo Swing.\n\nName:\nPhone:\n\nHow can we help you?';
        }
        
        var mailtoUrl = 'mailto:info@temposwing.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        window.location.href = mailtoUrl;
    });
    
});
