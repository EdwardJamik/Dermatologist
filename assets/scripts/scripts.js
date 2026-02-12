    $(document).ready(function () {
      checkElementsInView()

      $(window).on('scroll', function () {
        checkElementsInView()
      })

      function checkElementsInView() {
        $('.fade-in, .slide-up, .fade-in-left, .fade-in-right, .scale-in').each(function () {
          if (isElementInViewport(this) && !$(this).hasClass('visible')) {
            $(this).addClass('visible')
          }
        })

        $('.stagger-children').each(function () {
          if (isElementInViewport(this)) {
            const children = $(this).children()
            let delay = 0

            children.each(function () {
              const element = $(this)
              if (!element.hasClass('visible')) {
                setTimeout(function () {
                  element.addClass('visible')
                }, delay)
                delay += 150
              }
            })
          }
        })

        $('.list-appear').each(function () {
          if (isElementInViewport(this)) {
            const items = $(this).find('li')
            let delay = 0

            items.each(function () {
              const item = $(this)
              if (!item.hasClass('visible')) {
                setTimeout(function () {
                  item.addClass('visible')
                }, delay)
                delay += 100
              }
            })
          }
        })
      }

      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect()
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
          rect.bottom >= 0
        )
      }
    })

    document.addEventListener('DOMContentLoaded', function () {
      function initSliderWithVisibilityControl(sliderSelector, slickOptions) {
        const sliderElement = $(sliderSelector)
        const defaultOptions = {
          autoplay: false,
          pauseOnHover: false
        }

        const options = { ...defaultOptions, ...slickOptions }
        sliderElement.slick(options)

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              sliderElement.slick('slickPlay')
            } else {
              sliderElement.slick('slickPause')
            }
          })
        }, {
          root: null,
          rootMargin: '0px',
          threshold: 0.3
        })


        observer.observe(sliderElement[0])
      }

      initSliderWithVisibilityControl('.sliders .messageSlider', {
        infinite: true,
        variableWidth: true,
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: true,
        mobileFirst: true,
        useTransform: true,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplaySpeed: 3000
      })

      initSliderWithVisibilityControl('.sliders .photoSlider', {
        infinite: true,
        variableWidth: true,
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: true,
        mobileFirst: true,
        useTransform: true,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplaySpeed: 3000
      })

      initSliderWithVisibilityControl('.slider_certificate .content', {
        infinite: true,
        variableWidth: true,
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: true,
        mobileFirst: true,
        useTransform: true,
        slidesToScroll: 1,
        arrows: false,
        dots: false
      })
    })


    $(document).ready(function () {
      function animateNumbers() {
        $('.about_list .first li span b').each(function () {
          const $this = $(this)

          if (!$this.hasClass('animated')) {

            let endValue = parseInt($this.text())

            if ($this.text().indexOf('+') !== -1) {
              endValue = parseInt($this.text())
              const hasPlus = true
            }

            $this.text('0')
            $this.addClass('animated')

            const duration = 2000
            let step = 1

            if (endValue > 100) {
              step = Math.ceil(endValue / 100)
            }

            let current = 0
            const interval = setInterval(function () {
              current += step

              if (current >= endValue) {
                clearInterval(interval)
                $this.text(endValue + ($this.text().indexOf('+') !== -1 ? '+' : ''))
              } else {
                $this.text(current)
              }
            }, Math.floor(duration / (endValue / step)))
          }
        })
      }

      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect()
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
          rect.bottom >= 0
        )
      }

      function checkIfNumbersVisible() {
        const numbersBlock = $('.about_list .first')
        if (isElementInViewport(numbersBlock[0]) && !numbersBlock.hasClass('numbers-animated')) {
          numbersBlock.addClass('numbers-animated')
          animateNumbers()
        }
      }

      checkIfNumbersVisible()

      $(window).on('scroll', function () {
        checkIfNumbersVisible()
      })
    })

    $(document).ready(function () {
      let expanded = false
      const $hiddenContent = $('.hidden-content')
      const $readMoreBtn = $('#readMoreBtn')

      $readMoreBtn.click(function () {
        if (!expanded) {
          $hiddenContent.css('height', 'auto')
          $hiddenContent.addClass('visible')

          $readMoreBtn.text('Згорнути')
          expanded = true
        } else {
          $hiddenContent.removeClass('visible')

          setTimeout(function () {
            $hiddenContent.css('height', '0')
          }, 100)

          $readMoreBtn.text('Дивитись далі')
          expanded = false
        }
      })
    })

    $(document).ready(function () {
      const $showMoreBtn = $('.show-more-btn')
      let isExpanded = false

      $showMoreBtn.click(function () {
        if (!isExpanded) {
          expandList()
        } else {
          collapseList()
        }

        isExpanded = !isExpanded
        $showMoreBtn.css({
          'display': 'none'
        })
      })

      function expandList() {
        const $hiddenItems = $('.list-appear-education li.hidden')
        const $lastItem = $('.list-appear-education li.last-item')

        $lastItem.removeClass('last-item')

        $hiddenItems.each(function (index) {
          const $item = $(this)

          $item.removeClass('hidden').addClass('animating')

          const height = $item.outerHeight()

          $item.css({
            'height': '0',
            'opacity': '0',
            'overflow': 'hidden'
          })

          setTimeout(function () {
            $item.css({
              'transition': 'height 0.4s ease, opacity 0.4s ease',
              'height': height + 'px',
              'opacity': '1'
            })

            setTimeout(function () {
              $item.css({
                'height': '',
                'overflow': '',
                'transition': ''
              }).addClass('visible').removeClass('animating')
            }, 450)
          }, 100 * index)
        })
      }

      function collapseList() {
        const $visibleItems = $('.list-appear-education li.visible')
        const lastIndex = $visibleItems.length - 1

        $($visibleItems.get().reverse()).each(function (index) {
          const $item = $(this)
          const height = $item.outerHeight()

          setTimeout(function () {
            $item.addClass('animating').css({
              'height': height + 'px',
              'overflow': 'hidden',
              'transition': 'height 0.4s ease, opacity 0.4s ease'
            })

            setTimeout(function () {
              $item.css({
                'height': '0',
                'opacity': '0'
              })

              setTimeout(function () {
                $item.removeClass('visible')
                  .addClass('hidden')
                  .removeClass('animating')
                  .css({
                    'height': '',
                    'opacity': '',
                    'overflow': '',
                    'transition': ''
                  })

                if (index === lastIndex) {
                  $('.list-appear-education li:not(.hidden)').last().addClass('last-item')
                }
              }, 450)
            }, 10)
          }, 100 * index)
        })
      }
    })

    $(document).ready(function () {
      $('.tarifsContent > div').hide()
      $('.tarifsContent > div:first-child').show()

      $('.sections .buttons button').click(function () {
        $('.sections .buttons button').removeClass('active')
        $(this).addClass('active')

        var index = $(this).index()

        $('.tarifsContent > div').hide()

        $('.tarifsContent > div').eq(index).show()
      })
    })

    $(document).ready(function () {
      $('.container ul li .content').hide()
      $('.container ul li').removeClass('open')
      $('.container ul li .title button').css('transform', 'rotate(0deg)')
      $('.container ul li .title').click(function () {
        var currentLi = $(this).parent()
        var contentBlock = $(this).next('.content')
        var arrowButton = $(this).find('button')
        if (currentLi.hasClass('open')) {
          currentLi.removeClass('open')
          contentBlock.slideUp(300)
          arrowButton.css('transform', 'rotate(0deg)')
        } else {
          currentLi.addClass('open')
          contentBlock.slideDown(300)
          arrowButton.css('transform', 'rotate(180deg)')
        }
      })
    });

    document.addEventListener('DOMContentLoaded', function () {
      const consultationPriceBlocks = document.querySelectorAll('.consultationPrice')

      consultationPriceBlocks.forEach(function (priceBlock) {
        const buttons = priceBlock.querySelectorAll('.buttons button')
        const uaPrice = priceBlock.querySelector('.ua .price')
        const usPrice = priceBlock.querySelector('.us .price')
        const euPrice = priceBlock.querySelector('.eu .price')

        const consultationBlock = priceBlock.closest('.consultation')

        let joinLink = null
        if (consultationBlock) {
          let currentElement = consultationBlock
          while (currentElement.nextElementSibling) {
            if (currentElement.nextElementSibling.classList.contains('join_link')) {
              joinLink = currentElement.nextElementSibling
              break
            }
            currentElement = currentElement.nextElementSibling
          }

          if (!joinLink) {
            const parentBlock = consultationBlock.parentNode
            if (parentBlock) {
              joinLink = parentBlock.querySelector(':scope > .join_link')
            }
          }
        }

        priceBlock.relatedJoinLink = joinLink

        buttons.forEach(button => {
          button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'))

            this.classList.add('active')

            const id = this.id
            const prices = id.split(' ')

            if (prices.length >= 3) {
              const uaData = prices[0].split('-')
              if (uaData.length === 3 && uaPrice) {
                uaPrice.innerHTML = uaData[2] + ' <span>ГРН</span>'
              }

              const usData = prices[1].split('-')
              if (usData.length === 3 && usPrice) {
                usPrice.innerHTML = usData[2] + ' <span>USD</span>'
              }

              const euData = prices[2].split('-')
              if (euData.length === 3 && euPrice) {
                euPrice.innerHTML = euData[2] + ' <span>EUR</span>'
              }
            }

            const link = this.getAttribute('data-link')
            if (link && priceBlock.relatedJoinLink) {
              priceBlock.relatedJoinLink.href = link
              console.log('Оновлено посилання:', link, 'для елементу:', priceBlock.relatedJoinLink)
            }
          })
        })
      })
    })

    document.addEventListener('DOMContentLoaded', function () {
      var links = document.querySelectorAll('.join_link')

      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {
          e.preventDefault()

          var url = this.href

          window.location.href = url

          setTimeout(function () {
            if (window.Telegram && window.Telegram.WebApp) {
              Telegram.WebApp.close()
            }
          }, 100)
        })
      }
    });

    let calculatorData = {
      goal: null,
      direction: null,
      previous: null
    }

    function nextStep(currentStep) {
      let isValid = false

      if (currentStep === 1) {
        const goalInput = document.querySelector('input[name="goal"]:checked')
        if (goalInput) {
          calculatorData.goal = goalInput.value
          isValid = true
        }

        if (isValid && calculatorData.goal === 'care') {
          openResultPopup('result-4')
          return
        }

      } else if (currentStep === 2) {
        const directionInput = document.querySelector('input[name="direction"]:checked')
        if (directionInput) {
          calculatorData.direction = directionInput.value
          isValid = true
        }

        if (isValid && calculatorData.direction === 'other') {
          openResultPopup('result-5')
          return
        }
      }

      if (!isValid) {
        alert('Будь ласка, оберіть один з варіантів')
        return
      }

      const currentStepEl = document.querySelector('.step-' + currentStep)
      const nextStepEl = document.querySelector('.step-' + (currentStep + 1))

      if (currentStepEl && nextStepEl) {
        currentStepEl.classList.add('slide-out-left')

        nextStepEl.style.display = 'block'
        requestAnimationFrame(() => {
          nextStepEl.classList.add('active', 'slide-in-right')
        })

        setTimeout(() => {
          currentStepEl.classList.remove('active', 'slide-out-left')
          currentStepEl.style.display = 'none'
          nextStepEl.classList.remove('slide-in-right')
          nextStepEl.style.display = ''
        }, 500)
      }
    }

    function prevStep(currentStep) {
      let currentStepEl
      let prevStepEl
      console.log('Prev step from:', currentStep)

      currentStepEl = document.querySelector('.step-' + currentStep)
      prevStepEl = document.querySelector('.step-' + (currentStep - 1))

      if (currentStepEl && prevStepEl) {
        currentStepEl.classList.add('slide-out-right')

        prevStepEl.style.display = 'block'
        requestAnimationFrame(() => {
          prevStepEl.classList.add('active', 'slide-in-left')
        })

        // document.getElementById('tariff-calculator').scrollIntoView({
        //   behavior: 'smooth',
        //   block: 'start'
        // })

        setTimeout(() => {
          currentStepEl.classList.remove('active', 'slide-out-right')
          currentStepEl.style.display = 'none'
          prevStepEl.classList.remove('slide-in-left')
          prevStepEl.style.display = ''
        }, 500)
      }
    }

    function showResult() {
      const previousInput = document.querySelector('input[name="previous"]:checked')
      if (!previousInput) {
        alert('Будь ласка, оберіть один з варіантів')
        return
      }

      calculatorData.previous = previousInput.value

      if (calculatorData.direction === 'acne') {
        if (calculatorData.previous === 'no') {
          openResultPopup('result-1')
        } else if (calculatorData.previous === 'completed') {
          openResultPopup('result-2')
        }
      } else if (calculatorData.direction === 'hair') {
        if (calculatorData.previous === 'no') {
          openResultPopup('result-3')
        } else if (calculatorData.previous === 'completed') {
          openResultPopup('result-2')
        }
      }
    }

    function openResultPopup(resultClass) {
      const resultContent = document.querySelector('.' + resultClass)
      if (!resultContent) {
        console.error('Result content not found for class:', resultClass)
        return
      }

      const overlay = resultContent.closest('.popup-overlay')
      if (overlay) {
        overlay.classList.add('active')
        document.body.style.overflow = 'hidden'
      }
    }

    function resetCalculator(skipScroll = false) {
      calculatorData = {
        goal: null,
        direction: null,
        previous: null
      }

      document.querySelectorAll('.calculator-radio input[type="radio"]').forEach(input => {
        input.checked = false
      })

      document.querySelectorAll('.popup-overlay').forEach(popup => {
        popup.classList.remove('active')
      })
      document.body.style.overflow = ''

      document.querySelectorAll('.calculator-step').forEach(step => {
        step.classList.remove('active', 'slide-in-right', 'slide-out-left', 'slide-out-right', 'slide-in-left')
        step.style.display = 'none'
      })

      const step1 = document.querySelector('.step-1')
      step1.style.display = 'block'
      step1.classList.add('active')

      // Scroll to calculator only if not skipped
      // if (!skipScroll) {
      //   document.getElementById('tariff-calculator').scrollIntoView({
      //     behavior: 'smooth',
      //     block: 'start'
      //   })
      // }
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.popup-overlay').forEach(popup => {
        const backTestBtn = popup.querySelector('.back_test')
        const closeBtn = popup.querySelector('.close-btn')

        if (backTestBtn) {
          backTestBtn.addEventListener('click', (e) => {
            e.preventDefault()
            resetCalculator()
          })
        }

        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.preventDefault()
            resetCalculator()
          })
        }
      })

      document.querySelectorAll('a[href^="#result-"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault()
          const targetId = this.getAttribute('href').substring(1)
          const targetElement = document.getElementById(targetId)

          if (targetElement) {
            resetCalculator(true)

            let parent = targetElement
            while (parent && !parent.parentElement.classList.contains('tarifsContent')) {
              parent = parent.parentElement
            }

            if (parent) {
              const children = Array.from(document.querySelector('.tarifsContent').children)
              const index = children.indexOf(parent)

              if (index >= 0) {
                const buttons = document.querySelectorAll('.sections .buttons button')
                if (buttons[index]) {
                  buttons[index].click()
                }
              }
            }

            setTimeout(() => {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 300)
          }
        })
      })
    })