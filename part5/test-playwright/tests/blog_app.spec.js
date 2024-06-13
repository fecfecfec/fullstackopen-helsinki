const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, logOut, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Play Wright',
        username: 'playholder',
        password: 'wrightoo',
      },
    })
    await request.post('/api/users', {
      data: {
        name: 'Someone Else',
        username: 'guest',
        password: 'guestappo',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByRole('heading', { name: 'Login' })
    await expect(locator).toBeVisible()
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible()
  })

  describe('Login', () => {
    test('Successful login with approved credentials', async ({ page }) => {
      await loginWith(page, 'playholder', 'wrightoo')

      await expect(page.getByText('👋 Play Wright logged in')).toBeVisible()
    })

    test('Failed login with wrong credentials', async ({ page }) => {
      await loginWith(page, 'playholder', 'wrongo')

      await expect(
        page.getByText('Wrong credentials. Invalid username or password')
      ).toBeVisible()
      await expect(page.getByText('👋 Play Wright logged in')).not.toBeVisible()
    })

    describe('Logged user', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'playholder', 'wrightoo')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(
          page,
          'Playwright documentation is awesome',
          'Mr Wright',
          'https://playwright.dev/docs/intro'
        )

        // The test should ensure that the created blog is visible in the list of blogs.
        const blogList = await page.getByTestId('blog')
        await expect(
          blogList.getByRole('heading', { name: 'Playwright documentation is' })
        ).toBeVisible()
      })

      describe('A blogs is returned and details can be viewed', () => {
        beforeEach(async ({ page }) => {
          await createBlog(
            page,
            'Playwright documentation is awesome',
            'Mr Wright',
            'https://playwright.dev/docs/intro'
          )
          await page.getByText('Mr Wright').waitFor()

          await page
            .locator('div')
            .filter({
              hasText:
                /^Playwright documentation is awesome by Mr WrightViewHide$/,
            })
            .getByRole('button')
            .click()

          await page
            .getByRole('button', { name: 'Like' })
            .waitFor({ state: 'visible' })
        })

        test('check that blogs can be liked', async ({ page }) => {
          await page.waitForTimeout(200)
          await page.getByRole('button', { name: 'Like' }).click()

          await page.waitForTimeout(200)
          await page.getByRole('button', { name: 'Like' }).click()

          await page.waitForTimeout(200)
          await page.getByRole('button', { name: 'Like' }).click()
          await page.waitForTimeout(200)

          const likesNumber = page.getByTestId('blog-likes-number')

          await expect(likesNumber).toHaveText('3')
        })

        test('check that blogs can be deleted', async ({ page }) => {
          // Dialog handler
          page.on('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`)
            await dialog.accept()
          })

          await page.getByRole('button', { name: '🗑️ Remove blog' }).click()
          //   await page.waitForTimeout(1000)

          await expect(
            page.getByRole('heading', {
              name: 'Playwright documentation is',
            })
          ).not.toBeVisible()
        })

        describe('Logged Guest', () => {
          beforeEach(async ({ page }) => {
            await logOut(page)

            // Log guest
            await loginWith(page, 'guest', 'guestappo')
            await expect(
              page.getByText('👋 Someone Else logged in')
            ).toBeVisible()

            await page
              .locator('div')
              .filter({
                hasText:
                  /^Playwright documentation is awesome by Mr WrightViewHide$/,
              })
              .getByRole('button')
              .click()

            await page
              .getByRole('button', { name: 'Like' })
              .waitFor({ state: 'visible' })
          })

          test('check that blogs from other users can be liked', async ({
            page,
          }) => {
            await page.waitForTimeout(100)
            await page.getByRole('button', { name: 'Like' }).click()

            await page.waitForTimeout(100)
            await page.getByRole('button', { name: 'Like' }).click()

            await page.waitForTimeout(100)
            await page.getByRole('button', { name: 'Like' }).click()
            await page.waitForTimeout(100)

            const likesNumber = page.getByTestId('blog-likes-number')

            await expect(likesNumber).toHaveText('3')
          })

          test('check that blogs from other users can not be deleted', async ({
            page,
          }) => {
            const deleteButton = page
              .locator('div')
              .filter({
                hasText:
                  /^Playwright documentation is awesome by Mr WrightViewHide$/,
              })
              .getByRole('button')

            await expect(deleteButton).not.toBeVisible
          })
        })
      })

      describe('Many blogs are returned and details can be viewed', () => {
        beforeEach(async ({ page }) => {
          await createBlog(
            page,
            'Playwright documentation is awesome',
            'Mr Wright',
            'https://playwright.dev/docs/intro'
          )
          await createBlog(
            page,
            'Playwright plugin is cool',
            'Mr Wrong',
            'https://playwright.dev/docs/intro'
          )

          await createBlog(
            page,
            'Helper functions are a must',
            'Mr Left',
            'https://playwright.dev/docs/intro'
          )
          await page.getByText('Mr Left').waitFor()

          await page
            .locator('div')
            .filter({
              hasText:
                /^Playwright documentation is awesome by Mr WrightViewHide$/,
            })
            .getByRole('button')
            .click()

          await page
            .locator('div')
            .filter({
              hasText: /^Playwright plugin is cool by Mr WrongViewHide$/,
            })
            .getByRole('button')
            .click()

          await page
            .locator('div')
            .filter({
              hasText: /^Helper functions are a must by Mr LeftViewHide$/,
            })
            .getByRole('button')
            .click()

          await page
            .getByTestId('blog-likes-button')
            .nth(2)
            .waitFor({ state: 'visible' })
        })

        test('blogs are sorted according to likes', async ({ page }) => {
          const likesButtons = page.getByTestId('blog-likes-button')
          const blogHeadings = page.getByTestId('blog-title')
          // Click like buttons to set up the test scenario
          // Like the last blog to make it change order
          await page.waitForTimeout(200)
          await likesButtons.nth(2).click()
          await page.waitForTimeout(200)
          await likesButtons.nth(0).click()
          await page.waitForTimeout(200)
          await likesButtons.nth(2).click()
          await page.waitForTimeout(200)

          // Get all like number elements
          const likeCounts = await page.getByTestId('blog-likes-number').all()
          //   console.log(likeCounts)

          // Map the array and convert number strings to numbers
          const likeCountNumbers = await Promise.all(
            likeCounts.map(async (element) => {
              const text = await element.textContent()
              return parseInt(text)
            })
          )
          //   console.log(likeCountNumbers)

          // Check if the like counts are in descending order
          for (let i = 1; i < likeCountNumbers.length; i++) {
            expect(likeCountNumbers[i - 1]).toBeGreaterThanOrEqual(
              likeCountNumbers[i]
            )
          }

          // Check if the last blog posted is the first one after voting.
          expect(blogHeadings.nth(0)).toHaveText(/Helper functions.*/)
        })
      })
    })
  })
})
