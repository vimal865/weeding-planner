# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-admin.spec.ts >> Admin Panel >> admin vendors search filter is visible
- Location: tests\05-admin.spec.ts:31:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByPlaceholder(/Search vendors/i)
Expected: visible
Error: strict mode violation: getByPlaceholder(/Search vendors/i) resolved to 2 elements:
    1) <input type="text" placeholder="Search vendors, enquiries, blog..." class="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none"/> aka getByRole('textbox', { name: 'Search vendors, enquiries,' })
    2) <input type="text" placeholder="Search vendors..." class="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none"/> aka getByRole('textbox', { name: 'Search vendors...' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByPlaceholder(/Search vendors/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - text: "Kerala & Tamil Nadu's #1 Wedding Vendor Platform|1,000+ Verified Vendors|"
      - link "List Your Business — Free" [ref=e4] [cursor=pointer]:
        - /url: /vendors/list-your-business
    - generic [ref=e6]:
      - link "KalyanamToday" [ref=e7] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: KalyanamToday
      - navigation [ref=e9]:
        - link "Vendors" [ref=e11] [cursor=pointer]:
          - /url: /vendors
          - text: Vendors
          - img [ref=e12]
        - link "Real Weddings" [ref=e15] [cursor=pointer]:
          - /url: /real-weddings
        - link "Inspiration" [ref=e17] [cursor=pointer]:
          - /url: /inspiration
        - link "Planning Tools" [ref=e19] [cursor=pointer]:
          - /url: /planning
        - link "Muhurtham Dates" [ref=e21] [cursor=pointer]:
          - /url: /muhurtham
        - link "Blog" [ref=e23] [cursor=pointer]:
          - /url: /blog
      - generic [ref=e24]:
        - button "EN" [ref=e25] [cursor=pointer]:
          - img [ref=e26]
          - generic [ref=e29]: EN
          - img [ref=e30]
        - link [ref=e32] [cursor=pointer]:
          - /url: /wishlist
          - img [ref=e33]
        - button "UA UAT Admin User" [ref=e36] [cursor=pointer]:
          - generic [ref=e37]: UA
          - generic [ref=e38]: UAT Admin User
          - img [ref=e39]
        - link "List Your Business" [ref=e41] [cursor=pointer]:
          - /url: /vendors/list-your-business
  - main [ref=e42]:
    - generic [ref=e43]:
      - complementary [ref=e44]:
        - generic [ref=e45]:
          - generic [ref=e46]:
            - link "KalyanamToday" [ref=e47] [cursor=pointer]:
              - /url: /admin
              - generic [ref=e48]: KalyanamToday
            - paragraph [ref=e49]: Admin Panel
          - navigation [ref=e50]:
            - link "Dashboard" [ref=e51] [cursor=pointer]:
              - /url: /admin
              - img [ref=e52]
              - generic [ref=e57]: Dashboard
            - generic [ref=e58]:
              - button "Vendors" [ref=e59] [cursor=pointer]:
                - img [ref=e60]
                - generic [ref=e65]: Vendors
                - img [ref=e66]
              - generic [ref=e68]:
                - link "All Vendors" [ref=e69] [cursor=pointer]:
                  - /url: /admin/vendors
                  - img [ref=e70]
                  - text: All Vendors
                - link "Pending Approval" [ref=e71] [cursor=pointer]:
                  - /url: /admin/vendors?status=pending
                  - img [ref=e72]
                  - text: Pending Approval
                - link "Featured Slots" [ref=e75] [cursor=pointer]:
                  - /url: /admin/vendors?tab=featured
                  - img [ref=e76]
                  - text: Featured Slots
            - link "Enquiries 12" [ref=e78] [cursor=pointer]:
              - /url: /admin/enquiries
              - img [ref=e79]
              - generic [ref=e81]: Enquiries
              - generic [ref=e82]: "12"
            - generic [ref=e83]:
              - button "Blog" [ref=e84] [cursor=pointer]:
                - img [ref=e85]
                - generic [ref=e88]: Blog
                - img [ref=e89]
              - generic [ref=e91]:
                - link "All Posts" [ref=e92] [cursor=pointer]:
                  - /url: /admin/blog
                  - img [ref=e93]
                  - text: All Posts
                - link "New Post" [ref=e94] [cursor=pointer]:
                  - /url: /admin/blog/new
                  - img [ref=e95]
                  - text: New Post
            - link "Real Weddings" [ref=e97] [cursor=pointer]:
              - /url: /admin/real-weddings
              - img [ref=e98]
              - generic [ref=e100]: Real Weddings
            - link "Users" [ref=e101] [cursor=pointer]:
              - /url: /admin/users
              - img [ref=e102]
              - generic [ref=e107]: Users
            - link "Analytics" [ref=e108] [cursor=pointer]:
              - /url: /admin/analytics
              - img [ref=e109]
              - generic [ref=e110]: Analytics
            - link "Muhurtham" [ref=e111] [cursor=pointer]:
              - /url: /admin/muhurtham
              - img [ref=e112]
              - generic [ref=e114]: Muhurtham
            - link "Settings" [ref=e115] [cursor=pointer]:
              - /url: /admin/settings
              - img [ref=e116]
              - generic [ref=e119]: Settings
          - generic [ref=e120]:
            - link "View Live Site" [ref=e121] [cursor=pointer]:
              - /url: /
              - img [ref=e122]
              - text: View Live Site
            - button "Sign Out" [ref=e127] [cursor=pointer]:
              - img [ref=e128]
              - text: Sign Out
      - generic [ref=e131]:
        - generic [ref=e132]:
          - generic [ref=e133]:
            - img [ref=e134]
            - textbox "Search vendors, enquiries, blog..." [ref=e137]
          - generic [ref=e138]:
            - button [ref=e139] [cursor=pointer]:
              - img [ref=e140]
            - generic [ref=e144]:
              - generic [ref=e145]: A
              - generic [ref=e146]:
                - paragraph [ref=e147]: Admin
                - paragraph [ref=e148]: Super Admin
        - main [ref=e149]:
          - generic [ref=e150]:
            - generic [ref=e151]:
              - generic [ref=e152]:
                - heading "All Vendors" [level=1] [ref=e153]
                - paragraph [ref=e154]: 15 vendors of 15 total
              - generic [ref=e155]:
                - button "Export CSV" [ref=e156] [cursor=pointer]:
                  - img [ref=e157]
                  - text: Export CSV
                - link "+ Add Vendor" [ref=e160] [cursor=pointer]:
                  - /url: /admin/vendors/new
            - generic [ref=e161]:
              - generic [ref=e162]:
                - img [ref=e163]
                - textbox "Search vendors..." [ref=e166]
              - combobox [ref=e167] [cursor=pointer]:
                - option "All Categories" [selected]
                - option "Photography"
                - option "Venues"
                - option "Makeup"
                - option "Catering"
                - option "Decoration"
              - combobox [ref=e168] [cursor=pointer]:
                - option "All Plans" [selected]
                - option "Free"
                - option "Premium"
                - option "Elite"
              - generic [ref=e169]:
                - link "All" [ref=e170] [cursor=pointer]:
                  - /url: /admin/vendors
                - link "Pending" [ref=e171] [cursor=pointer]:
                  - /url: /admin/vendors?status=pending
            - generic [ref=e172]:
              - table [ref=e174]:
                - rowgroup [ref=e175]:
                  - row "Vendor Category · City Rating Plan Status Enquiries Actions" [ref=e176]:
                    - columnheader "Vendor" [ref=e177]
                    - columnheader "Category · City" [ref=e178]
                    - columnheader "Rating" [ref=e179]
                    - columnheader "Plan" [ref=e180]
                    - columnheader "Status" [ref=e181]
                    - columnheader "Enquiries" [ref=e182]
                    - columnheader "Actions" [ref=e183]
                - rowgroup [ref=e184]:
                  - row "K Kochi Wedding Palace Added 7 Jun 2026 venues Kochi 4.8 (124) elite ● Published Verified 89" [ref=e185]:
                    - cell "K Kochi Wedding Palace Added 7 Jun 2026" [ref=e186]:
                      - generic [ref=e187]:
                        - generic [ref=e188]: K
                        - generic [ref=e189]:
                          - paragraph [ref=e190]: Kochi Wedding Palace
                          - paragraph [ref=e191]: Added 7 Jun 2026
                    - cell "venues Kochi" [ref=e192]:
                      - paragraph [ref=e193]: venues
                      - paragraph [ref=e194]: Kochi
                    - cell "4.8 (124)" [ref=e195]:
                      - generic [ref=e196]:
                        - img [ref=e197]
                        - generic [ref=e199]: "4.8"
                        - generic [ref=e200]: (124)
                    - cell "elite" [ref=e201]:
                      - generic [ref=e202]:
                        - img [ref=e203]
                        - text: elite
                    - cell "● Published Verified" [ref=e205]:
                      - generic [ref=e206]:
                        - generic [ref=e207]: ● Published
                        - generic [ref=e208]:
                          - img [ref=e209]
                          - text: Verified
                    - cell "89" [ref=e212]
                    - cell [ref=e213]:
                      - generic [ref=e214]:
                        - link "View / Edit" [ref=e215] [cursor=pointer]:
                          - /url: /admin/vendors/e404e304-3281-49fc-9145-67f5cab89697
                          - img [ref=e216]
                        - button "More" [ref=e219] [cursor=pointer]:
                          - img [ref=e220]
                  - row "R Royal Gardens Banquet Hall Added 7 Jun 2026 venues Thrissur 4.6 (87) premium ● Published Verified 62" [ref=e224]:
                    - cell "R Royal Gardens Banquet Hall Added 7 Jun 2026" [ref=e225]:
                      - generic [ref=e226]:
                        - generic [ref=e227]: R
                        - generic [ref=e228]:
                          - paragraph [ref=e229]: Royal Gardens Banquet Hall
                          - paragraph [ref=e230]: Added 7 Jun 2026
                    - cell "venues Thrissur" [ref=e231]:
                      - paragraph [ref=e232]: venues
                      - paragraph [ref=e233]: Thrissur
                    - cell "4.6 (87)" [ref=e234]:
                      - generic [ref=e235]:
                        - img [ref=e236]
                        - generic [ref=e238]: "4.6"
                        - generic [ref=e239]: (87)
                    - cell "premium" [ref=e240]:
                      - generic [ref=e241]: premium
                    - cell "● Published Verified" [ref=e242]:
                      - generic [ref=e243]:
                        - generic [ref=e244]: ● Published
                        - generic [ref=e245]:
                          - img [ref=e246]
                          - text: Verified
                    - cell "62" [ref=e249]
                    - cell [ref=e250]:
                      - generic [ref=e251]:
                        - link "View / Edit" [ref=e252] [cursor=pointer]:
                          - /url: /admin/vendors/5684fe89-33e6-4129-aca5-2c62c5bb405d
                          - img [ref=e253]
                        - button "More" [ref=e256] [cursor=pointer]:
                          - img [ref=e257]
                  - row "G Grand Kalyana Mandapam Added 7 Jun 2026 venues Chennai 4.5 (56) free ● Published Verified 41" [ref=e261]:
                    - cell "G Grand Kalyana Mandapam Added 7 Jun 2026" [ref=e262]:
                      - generic [ref=e263]:
                        - generic [ref=e264]: G
                        - generic [ref=e265]:
                          - paragraph [ref=e266]: Grand Kalyana Mandapam
                          - paragraph [ref=e267]: Added 7 Jun 2026
                    - cell "venues Chennai" [ref=e268]:
                      - paragraph [ref=e269]: venues
                      - paragraph [ref=e270]: Chennai
                    - cell "4.5 (56)" [ref=e271]:
                      - generic [ref=e272]:
                        - img [ref=e273]
                        - generic [ref=e275]: "4.5"
                        - generic [ref=e276]: (56)
                    - cell "free" [ref=e277]:
                      - generic [ref=e278]: free
                    - cell "● Published Verified" [ref=e279]:
                      - generic [ref=e280]:
                        - generic [ref=e281]: ● Published
                        - generic [ref=e282]:
                          - img [ref=e283]
                          - text: Verified
                    - cell "41" [ref=e286]
                    - cell [ref=e287]:
                      - generic [ref=e288]:
                        - link "View / Edit" [ref=e289] [cursor=pointer]:
                          - /url: /admin/vendors/1f3814d3-ec1f-4e76-87e2-da7493cd7afb
                          - img [ref=e290]
                        - button "More" [ref=e293] [cursor=pointer]:
                          - img [ref=e294]
                  - row "C Candid Moments by Arun Added 7 Jun 2026 photographers Coimbatore 4.7 (43) premium ● Published Verified 58" [ref=e298]:
                    - cell "C Candid Moments by Arun Added 7 Jun 2026" [ref=e299]:
                      - generic [ref=e300]:
                        - generic [ref=e301]: C
                        - generic [ref=e302]:
                          - paragraph [ref=e303]: Candid Moments by Arun
                          - paragraph [ref=e304]: Added 7 Jun 2026
                    - cell "photographers Coimbatore" [ref=e305]:
                      - paragraph [ref=e306]: photographers
                      - paragraph [ref=e307]: Coimbatore
                    - cell "4.7 (43)" [ref=e308]:
                      - generic [ref=e309]:
                        - img [ref=e310]
                        - generic [ref=e312]: "4.7"
                        - generic [ref=e313]: (43)
                    - cell "premium" [ref=e314]:
                      - generic [ref=e315]: premium
                    - cell "● Published Verified" [ref=e316]:
                      - generic [ref=e317]:
                        - generic [ref=e318]: ● Published
                        - generic [ref=e319]:
                          - img [ref=e320]
                          - text: Verified
                    - cell "58" [ref=e323]
                    - cell [ref=e324]:
                      - generic [ref=e325]:
                        - link "View / Edit" [ref=e326] [cursor=pointer]:
                          - /url: /admin/vendors/df400186-6c5e-4e84-9a97-1db25e93701a
                          - img [ref=e327]
                        - button "More" [ref=e330] [cursor=pointer]:
                          - img [ref=e331]
                  - row "M Moments & Memories Studio Added 7 Jun 2026 photographers Chennai 4.4 (28) free ● Published 34" [ref=e335]:
                    - cell "M Moments & Memories Studio Added 7 Jun 2026" [ref=e336]:
                      - generic [ref=e337]:
                        - generic [ref=e338]: M
                        - generic [ref=e339]:
                          - paragraph [ref=e340]: Moments & Memories Studio
                          - paragraph [ref=e341]: Added 7 Jun 2026
                    - cell "photographers Chennai" [ref=e342]:
                      - paragraph [ref=e343]: photographers
                      - paragraph [ref=e344]: Chennai
                    - cell "4.4 (28)" [ref=e345]:
                      - generic [ref=e346]:
                        - img [ref=e347]
                        - generic [ref=e349]: "4.4"
                        - generic [ref=e350]: (28)
                    - cell "free" [ref=e351]:
                      - generic [ref=e352]: free
                    - cell "● Published" [ref=e353]:
                      - generic [ref=e355]: ● Published
                    - cell "34" [ref=e356]
                    - cell [ref=e357]:
                      - generic [ref=e358]:
                        - link "View / Edit" [ref=e359] [cursor=pointer]:
                          - /url: /admin/vendors/6ea51851-59c8-49b7-8d85-56976f8f33a2
                          - img [ref=e360]
                        - button "More" [ref=e363] [cursor=pointer]:
                          - img [ref=e364]
                  - row "A Artistry Bridal Lounge Added 7 Jun 2026 makeup artists Kochi 4.9 (98) premium ● Published Verified 145" [ref=e368]:
                    - cell "A Artistry Bridal Lounge Added 7 Jun 2026" [ref=e369]:
                      - generic [ref=e370]:
                        - generic [ref=e371]: A
                        - generic [ref=e372]:
                          - paragraph [ref=e373]: Artistry Bridal Lounge
                          - paragraph [ref=e374]: Added 7 Jun 2026
                    - cell "makeup artists Kochi" [ref=e375]:
                      - paragraph [ref=e376]: makeup artists
                      - paragraph [ref=e377]: Kochi
                    - cell "4.9 (98)" [ref=e378]:
                      - generic [ref=e379]:
                        - img [ref=e380]
                        - generic [ref=e382]: "4.9"
                        - generic [ref=e383]: (98)
                    - cell "premium" [ref=e384]:
                      - generic [ref=e385]: premium
                    - cell "● Published Verified" [ref=e386]:
                      - generic [ref=e387]:
                        - generic [ref=e388]: ● Published
                        - generic [ref=e389]:
                          - img [ref=e390]
                          - text: Verified
                    - cell "145" [ref=e393]
                    - cell [ref=e394]:
                      - generic [ref=e395]:
                        - link "View / Edit" [ref=e396] [cursor=pointer]:
                          - /url: /admin/vendors/b49bc19e-aee9-4d77-9f53-4401a19378b9
                          - img [ref=e397]
                        - button "More" [ref=e400] [cursor=pointer]:
                          - img [ref=e401]
                  - row "G Glam & Grace Makeup Studio Added 7 Jun 2026 makeup artists Chennai 4.6 (51) free ● Published Verified 63" [ref=e405]:
                    - cell "G Glam & Grace Makeup Studio Added 7 Jun 2026" [ref=e406]:
                      - generic [ref=e407]:
                        - generic [ref=e408]: G
                        - generic [ref=e409]:
                          - paragraph [ref=e410]: Glam & Grace Makeup Studio
                          - paragraph [ref=e411]: Added 7 Jun 2026
                    - cell "makeup artists Chennai" [ref=e412]:
                      - paragraph [ref=e413]: makeup artists
                      - paragraph [ref=e414]: Chennai
                    - cell "4.6 (51)" [ref=e415]:
                      - generic [ref=e416]:
                        - img [ref=e417]
                        - generic [ref=e419]: "4.6"
                        - generic [ref=e420]: (51)
                    - cell "free" [ref=e421]:
                      - generic [ref=e422]: free
                    - cell "● Published Verified" [ref=e423]:
                      - generic [ref=e424]:
                        - generic [ref=e425]: ● Published
                        - generic [ref=e426]:
                          - img [ref=e427]
                          - text: Verified
                    - cell "63" [ref=e430]
                    - cell [ref=e431]:
                      - generic [ref=e432]:
                        - link "View / Edit" [ref=e433] [cursor=pointer]:
                          - /url: /admin/vendors/8ffd1846-73cd-46ae-89c5-dddbb96e0cc0
                          - img [ref=e434]
                        - button "More" [ref=e437] [cursor=pointer]:
                          - img [ref=e438]
                  - row "S Sadya Masters Catering Added 7 Jun 2026 catering Kochi 4.8 (112) premium ● Published Verified 78" [ref=e442]:
                    - cell "S Sadya Masters Catering Added 7 Jun 2026" [ref=e443]:
                      - generic [ref=e444]:
                        - generic [ref=e445]: S
                        - generic [ref=e446]:
                          - paragraph [ref=e447]: Sadya Masters Catering
                          - paragraph [ref=e448]: Added 7 Jun 2026
                    - cell "catering Kochi" [ref=e449]:
                      - paragraph [ref=e450]: catering
                      - paragraph [ref=e451]: Kochi
                    - cell "4.8 (112)" [ref=e452]:
                      - generic [ref=e453]:
                        - img [ref=e454]
                        - generic [ref=e456]: "4.8"
                        - generic [ref=e457]: (112)
                    - cell "premium" [ref=e458]:
                      - generic [ref=e459]: premium
                    - cell "● Published Verified" [ref=e460]:
                      - generic [ref=e461]:
                        - generic [ref=e462]: ● Published
                        - generic [ref=e463]:
                          - img [ref=e464]
                          - text: Verified
                    - cell "78" [ref=e467]
                    - cell [ref=e468]:
                      - generic [ref=e469]:
                        - link "View / Edit" [ref=e470] [cursor=pointer]:
                          - /url: /admin/vendors/c4825bed-aecf-4ce8-912b-71e0362069a4
                          - img [ref=e471]
                        - button "More" [ref=e474] [cursor=pointer]:
                          - img [ref=e475]
                  - row "S Spice Garden Catering Added 7 Jun 2026 catering Coimbatore 4.3 (34) free ● Published 26" [ref=e479]:
                    - cell "S Spice Garden Catering Added 7 Jun 2026" [ref=e480]:
                      - generic [ref=e481]:
                        - generic [ref=e482]: S
                        - generic [ref=e483]:
                          - paragraph [ref=e484]: Spice Garden Catering
                          - paragraph [ref=e485]: Added 7 Jun 2026
                    - cell "catering Coimbatore" [ref=e486]:
                      - paragraph [ref=e487]: catering
                      - paragraph [ref=e488]: Coimbatore
                    - cell "4.3 (34)" [ref=e489]:
                      - generic [ref=e490]:
                        - img [ref=e491]
                        - generic [ref=e493]: "4.3"
                        - generic [ref=e494]: (34)
                    - cell "free" [ref=e495]:
                      - generic [ref=e496]: free
                    - cell "● Published" [ref=e497]:
                      - generic [ref=e499]: ● Published
                    - cell "26" [ref=e500]
                    - cell [ref=e501]:
                      - generic [ref=e502]:
                        - link "View / Edit" [ref=e503] [cursor=pointer]:
                          - /url: /admin/vendors/d871b523-524c-4f5c-b8bf-bf3b17671e89
                          - img [ref=e504]
                        - button "More" [ref=e507] [cursor=pointer]:
                          - img [ref=e508]
                  - row "P Petal Works Decor Added 7 Jun 2026 decorators Kochi 4.7 (67) premium ● Published Verified 55" [ref=e512]:
                    - cell "P Petal Works Decor Added 7 Jun 2026" [ref=e513]:
                      - generic [ref=e514]:
                        - generic [ref=e515]: P
                        - generic [ref=e516]:
                          - paragraph [ref=e517]: Petal Works Decor
                          - paragraph [ref=e518]: Added 7 Jun 2026
                    - cell "decorators Kochi" [ref=e519]:
                      - paragraph [ref=e520]: decorators
                      - paragraph [ref=e521]: Kochi
                    - cell "4.7 (67)" [ref=e522]:
                      - generic [ref=e523]:
                        - img [ref=e524]
                        - generic [ref=e526]: "4.7"
                        - generic [ref=e527]: (67)
                    - cell "premium" [ref=e528]:
                      - generic [ref=e529]: premium
                    - cell "● Published Verified" [ref=e530]:
                      - generic [ref=e531]:
                        - generic [ref=e532]: ● Published
                        - generic [ref=e533]:
                          - img [ref=e534]
                          - text: Verified
                    - cell "55" [ref=e537]
                    - cell [ref=e538]:
                      - generic [ref=e539]:
                        - link "View / Edit" [ref=e540] [cursor=pointer]:
                          - /url: /admin/vendors/6788a5d5-32d7-476a-928d-7d024de55443
                          - img [ref=e541]
                        - button "More" [ref=e544] [cursor=pointer]:
                          - img [ref=e545]
                  - row "F Floral Fantasy Events Added 7 Jun 2026 decorators Chennai 4.5 (42) free ● Published Verified 38" [ref=e549]:
                    - cell "F Floral Fantasy Events Added 7 Jun 2026" [ref=e550]:
                      - generic [ref=e551]:
                        - generic [ref=e552]: F
                        - generic [ref=e553]:
                          - paragraph [ref=e554]: Floral Fantasy Events
                          - paragraph [ref=e555]: Added 7 Jun 2026
                    - cell "decorators Chennai" [ref=e556]:
                      - paragraph [ref=e557]: decorators
                      - paragraph [ref=e558]: Chennai
                    - cell "4.5 (42)" [ref=e559]:
                      - generic [ref=e560]:
                        - img [ref=e561]
                        - generic [ref=e563]: "4.5"
                        - generic [ref=e564]: (42)
                    - cell "free" [ref=e565]:
                      - generic [ref=e566]: free
                    - cell "● Published Verified" [ref=e567]:
                      - generic [ref=e568]:
                        - generic [ref=e569]: ● Published
                        - generic [ref=e570]:
                          - img [ref=e571]
                          - text: Verified
                    - cell "38" [ref=e574]
                    - cell [ref=e575]:
                      - generic [ref=e576]:
                        - link "View / Edit" [ref=e577] [cursor=pointer]:
                          - /url: /admin/vendors/def1fbfc-bf81-4d70-8101-035dafbdc7dc
                          - img [ref=e578]
                        - button "More" [ref=e581] [cursor=pointer]:
                          - img [ref=e582]
                  - row "D Dream Weddings by Divya Added 7 Jun 2026 wedding planners Kochi 4.9 (76) elite ● Published Verified 94" [ref=e586]:
                    - cell "D Dream Weddings by Divya Added 7 Jun 2026" [ref=e587]:
                      - generic [ref=e588]:
                        - generic [ref=e589]: D
                        - generic [ref=e590]:
                          - paragraph [ref=e591]: Dream Weddings by Divya
                          - paragraph [ref=e592]: Added 7 Jun 2026
                    - cell "wedding planners Kochi" [ref=e593]:
                      - paragraph [ref=e594]: wedding planners
                      - paragraph [ref=e595]: Kochi
                    - cell "4.9 (76)" [ref=e596]:
                      - generic [ref=e597]:
                        - img [ref=e598]
                        - generic [ref=e600]: "4.9"
                        - generic [ref=e601]: (76)
                    - cell "elite" [ref=e602]:
                      - generic [ref=e603]:
                        - img [ref=e604]
                        - text: elite
                    - cell "● Published Verified" [ref=e606]:
                      - generic [ref=e607]:
                        - generic [ref=e608]: ● Published
                        - generic [ref=e609]:
                          - img [ref=e610]
                          - text: Verified
                    - cell "94" [ref=e613]
                    - cell [ref=e614]:
                      - generic [ref=e615]:
                        - link "View / Edit" [ref=e616] [cursor=pointer]:
                          - /url: /admin/vendors/80a9942c-2d51-4543-a4aa-1fe40cf5fb1b
                          - img [ref=e617]
                        - button "More" [ref=e620] [cursor=pointer]:
                          - img [ref=e621]
                  - row "E Eternal Bonds Events Added 7 Jun 2026 wedding planners Chennai 4.4 (31) free ● Published 27" [ref=e625]:
                    - cell "E Eternal Bonds Events Added 7 Jun 2026" [ref=e626]:
                      - generic [ref=e627]:
                        - generic [ref=e628]: E
                        - generic [ref=e629]:
                          - paragraph [ref=e630]: Eternal Bonds Events
                          - paragraph [ref=e631]: Added 7 Jun 2026
                    - cell "wedding planners Chennai" [ref=e632]:
                      - paragraph [ref=e633]: wedding planners
                      - paragraph [ref=e634]: Chennai
                    - cell "4.4 (31)" [ref=e635]:
                      - generic [ref=e636]:
                        - img [ref=e637]
                        - generic [ref=e639]: "4.4"
                        - generic [ref=e640]: (31)
                    - cell "free" [ref=e641]:
                      - generic [ref=e642]: free
                    - cell "● Published" [ref=e643]:
                      - generic [ref=e645]: ● Published
                    - cell "27" [ref=e646]
                    - cell [ref=e647]:
                      - generic [ref=e648]:
                        - link "View / Edit" [ref=e649] [cursor=pointer]:
                          - /url: /admin/vendors/6a217d63-a0ed-49b0-a94b-0db0d1dc11ed
                          - img [ref=e650]
                        - button "More" [ref=e653] [cursor=pointer]:
                          - img [ref=e654]
                  - row "H Henna Arts Studio Added 7 Jun 2026 mehendi Kochi 4.7 (55) free ● Published Verified 48" [ref=e658]:
                    - cell "H Henna Arts Studio Added 7 Jun 2026" [ref=e659]:
                      - generic [ref=e660]:
                        - generic [ref=e661]: H
                        - generic [ref=e662]:
                          - paragraph [ref=e663]: Henna Arts Studio
                          - paragraph [ref=e664]: Added 7 Jun 2026
                    - cell "mehendi Kochi" [ref=e665]:
                      - paragraph [ref=e666]: mehendi
                      - paragraph [ref=e667]: Kochi
                    - cell "4.7 (55)" [ref=e668]:
                      - generic [ref=e669]:
                        - img [ref=e670]
                        - generic [ref=e672]: "4.7"
                        - generic [ref=e673]: (55)
                    - cell "free" [ref=e674]:
                      - generic [ref=e675]: free
                    - cell "● Published Verified" [ref=e676]:
                      - generic [ref=e677]:
                        - generic [ref=e678]: ● Published
                        - generic [ref=e679]:
                          - img [ref=e680]
                          - text: Verified
                    - cell "48" [ref=e683]
                    - cell [ref=e684]:
                      - generic [ref=e685]:
                        - link "View / Edit" [ref=e686] [cursor=pointer]:
                          - /url: /admin/vendors/b60ae21c-3bba-4af9-998a-3a79e5690683
                          - img [ref=e687]
                        - button "More" [ref=e690] [cursor=pointer]:
                          - img [ref=e691]
                  - row "S SnapStory Photography Studio Added 7 Jun 2026 photographers Kochi 4.9 (87) elite ● Published Verified 114" [ref=e695]:
                    - cell "S SnapStory Photography Studio Added 7 Jun 2026" [ref=e696]:
                      - generic [ref=e697]:
                        - generic [ref=e698]: S
                        - generic [ref=e699]:
                          - paragraph [ref=e700]: SnapStory Photography Studio
                          - paragraph [ref=e701]: Added 7 Jun 2026
                    - cell "photographers Kochi" [ref=e702]:
                      - paragraph [ref=e703]: photographers
                      - paragraph [ref=e704]: Kochi
                    - cell "4.9 (87)" [ref=e705]:
                      - generic [ref=e706]:
                        - img [ref=e707]
                        - generic [ref=e709]: "4.9"
                        - generic [ref=e710]: (87)
                    - cell "elite" [ref=e711]:
                      - generic [ref=e712]:
                        - img [ref=e713]
                        - text: elite
                    - cell "● Published Verified" [ref=e715]:
                      - generic [ref=e716]:
                        - generic [ref=e717]: ● Published
                        - generic [ref=e718]:
                          - img [ref=e719]
                          - text: Verified
                    - cell "114" [ref=e722]
                    - cell [ref=e723]:
                      - generic [ref=e724]:
                        - link "View / Edit" [ref=e725] [cursor=pointer]:
                          - /url: /admin/vendors/b928b85a-9803-4e25-9a5f-ee311b3c3c09
                          - img [ref=e726]
                        - button "More" [ref=e729] [cursor=pointer]:
                          - img [ref=e730]
              - paragraph [ref=e735]: Showing 15 of 15 vendors
  - contentinfo [ref=e736]:
    - generic [ref=e738]:
      - generic [ref=e739]:
        - paragraph [ref=e740]: Plan your wedding on the go
        - paragraph [ref=e741]: Checklist, budget tracker, guest list — all in the app
      - generic [ref=e742]:
        - link "🍎 Download on App Store" [ref=e743] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e744]: 🍎
          - generic [ref=e745]:
            - generic [ref=e746]: Download on
            - generic [ref=e747]: App Store
        - link "▶ Get it on Google Play" [ref=e748] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e749]: ▶
          - generic [ref=e750]:
            - generic [ref=e751]: Get it on
            - generic [ref=e752]: Google Play
    - generic [ref=e753]:
      - generic [ref=e754]:
        - generic [ref=e755]:
          - link "KalyanamToday" [ref=e756] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e757]: Kerala & Tamil Nadu's trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
          - generic [ref=e758]:
            - link "Instagram" [ref=e759] [cursor=pointer]:
              - /url: "#"
              - img [ref=e760]
            - link "Facebook" [ref=e763] [cursor=pointer]:
              - /url: "#"
              - img [ref=e764]
            - link "YouTube" [ref=e766] [cursor=pointer]:
              - /url: "#"
              - img [ref=e767]
          - generic [ref=e770]:
            - link "+91 98765 43210" [ref=e771] [cursor=pointer]:
              - /url: tel:+919876543210
              - img [ref=e772]
              - generic [ref=e774]: +91 98765 43210
            - link "hello@kalyanamtoday.in" [ref=e775] [cursor=pointer]:
              - /url: mailto:hello@kalyanamtoday.in
              - img [ref=e776]
              - generic [ref=e779]: hello@kalyanamtoday.in
        - generic [ref=e780]:
          - heading "Kerala" [level=4] [ref=e781]
          - list [ref=e782]:
            - listitem [ref=e783]:
              - link "Kochi" [ref=e784] [cursor=pointer]:
                - /url: /vendors/kochi
            - listitem [ref=e785]:
              - link "Thrissur" [ref=e786] [cursor=pointer]:
                - /url: /vendors/thrissur
            - listitem [ref=e787]:
              - link "Trivandrum" [ref=e788] [cursor=pointer]:
                - /url: /vendors/trivandrum
            - listitem [ref=e789]:
              - link "Kozhikode" [ref=e790] [cursor=pointer]:
                - /url: /vendors/kozhikode
            - listitem [ref=e791]:
              - link "Palakkad" [ref=e792] [cursor=pointer]:
                - /url: /vendors/palakkad
            - listitem [ref=e793]:
              - link "Kannur" [ref=e794] [cursor=pointer]:
                - /url: /vendors/kannur
            - listitem [ref=e795]:
              - link "Kollam" [ref=e796] [cursor=pointer]:
                - /url: /vendors/kollam
            - listitem [ref=e797]:
              - link "Alappuzha" [ref=e798] [cursor=pointer]:
                - /url: /vendors/alappuzha
        - generic [ref=e799]:
          - heading "Tamil Nadu" [level=4] [ref=e800]
          - list [ref=e801]:
            - listitem [ref=e802]:
              - link "Chennai" [ref=e803] [cursor=pointer]:
                - /url: /vendors/chennai
            - listitem [ref=e804]:
              - link "Coimbatore" [ref=e805] [cursor=pointer]:
                - /url: /vendors/coimbatore
            - listitem [ref=e806]:
              - link "Madurai" [ref=e807] [cursor=pointer]:
                - /url: /vendors/madurai
            - listitem [ref=e808]:
              - link "Tiruppur" [ref=e809] [cursor=pointer]:
                - /url: /vendors/tiruppur
            - listitem [ref=e810]:
              - link "Salem" [ref=e811] [cursor=pointer]:
                - /url: /vendors/salem
            - listitem [ref=e812]:
              - link "Trichy" [ref=e813] [cursor=pointer]:
                - /url: /vendors/trichy
            - listitem [ref=e814]:
              - link "Erode" [ref=e815] [cursor=pointer]:
                - /url: /vendors/erode
            - listitem [ref=e816]:
              - link "Vellore" [ref=e817] [cursor=pointer]:
                - /url: /vendors/vellore
        - generic [ref=e818]:
          - heading "Vendors" [level=4] [ref=e819]
          - list [ref=e820]:
            - listitem [ref=e821]:
              - link "Wedding Venues" [ref=e822] [cursor=pointer]:
                - /url: /vendors/kochi/venues
            - listitem [ref=e823]:
              - link "Photographers" [ref=e824] [cursor=pointer]:
                - /url: /vendors/kochi/photographers
            - listitem [ref=e825]:
              - link "Makeup Artists" [ref=e826] [cursor=pointer]:
                - /url: /vendors/kochi/makeup_artists
            - listitem [ref=e827]:
              - link "Catering" [ref=e828] [cursor=pointer]:
                - /url: /vendors/kochi/catering
            - listitem [ref=e829]:
              - link "Decoration" [ref=e830] [cursor=pointer]:
                - /url: /vendors/kochi/decorators
            - listitem [ref=e831]:
              - link "Mehendi Artists" [ref=e832] [cursor=pointer]:
                - /url: /vendors/kochi/mehendi
            - listitem [ref=e833]:
              - link "DJ & Music" [ref=e834] [cursor=pointer]:
                - /url: /vendors/kochi/dj_music
            - listitem [ref=e835]:
              - link "Wedding Planners" [ref=e836] [cursor=pointer]:
                - /url: /vendors/kochi/wedding_planners
        - generic [ref=e837]:
          - heading "Quick Links" [level=4] [ref=e838]
          - list [ref=e839]:
            - listitem [ref=e840]:
              - link "Real Weddings" [ref=e841] [cursor=pointer]:
                - /url: /real-weddings
            - listitem [ref=e842]:
              - link "Inspiration Gallery" [ref=e843] [cursor=pointer]:
                - /url: /inspiration
            - listitem [ref=e844]:
              - link "Planning Tools" [ref=e845] [cursor=pointer]:
                - /url: /planning
            - listitem [ref=e846]:
              - link "Budget Calculator" [ref=e847] [cursor=pointer]:
                - /url: /planning/budget
            - listitem [ref=e848]:
              - link "Guest List" [ref=e849] [cursor=pointer]:
                - /url: /planning/guests
            - listitem [ref=e850]:
              - link "Muhurtham Dates" [ref=e851] [cursor=pointer]:
                - /url: /muhurtham
            - listitem [ref=e852]:
              - link "E-Invitations" [ref=e853] [cursor=pointer]:
                - /url: /e-invites
            - listitem [ref=e854]:
              - link "Blog" [ref=e855] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e856]:
              - link "List Your Business" [ref=e857] [cursor=pointer]:
                - /url: /vendors/list-your-business
            - listitem [ref=e858]:
              - link "About Us" [ref=e859] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e860]:
              - link "Contact" [ref=e861] [cursor=pointer]:
                - /url: /contact
      - generic [ref=e862]:
        - paragraph [ref=e863]: © 2026 KalyanamToday. All rights reserved.
        - generic [ref=e864]:
          - link "Privacy Policy" [ref=e865] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Use" [ref=e866] [cursor=pointer]:
            - /url: /terms
          - link "Refund Policy" [ref=e867] [cursor=pointer]:
            - /url: /refund
          - link "Sitemap" [ref=e868] [cursor=pointer]:
            - /url: /sitemap.xml
  - link "Chat with us on WhatsApp" [ref=e869] [cursor=pointer]:
    - /url: https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors
    - img [ref=e870]
    - generic [ref=e872]: Chat with us
  - alert [ref=e873]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { ADMIN_FILE }    from './auth-paths'
  3  | 
  4  | test.describe('Admin Panel', () => {
  5  |   test.use({ storageState: ADMIN_FILE })
  6  | 
  7  |   test('admin dashboard loads with stats', async ({ page }) => {
  8  |     await page.goto('/admin')
  9  |     await expect(page.locator('h1').filter({ hasText: /Dashboard/i })).toBeVisible()
  10 |     // Stats cards visible
  11 |     await expect(page.locator('text=Total Vendors')).toBeVisible()
  12 |     await expect(page.locator('text=Enquiries')).toBeVisible()
  13 |     await expect(page.locator('text=Registered Users')).toBeVisible()
  14 |   })
  15 | 
  16 |   test('admin sidebar is visible on desktop', async ({ page }) => {
  17 |     await page.goto('/admin')
  18 |     await expect(page.locator('aside').filter({ hasText: /KalyanamToday/i }).first()).toBeVisible()
  19 |     await expect(page.locator('text=Vendors').first()).toBeVisible()
  20 |     await expect(page.locator('text=Enquiries').first()).toBeVisible()
  21 |   })
  22 | 
  23 |   test('admin vendors page shows vendor table', async ({ page }) => {
  24 |     await page.goto('/admin/vendors')
  25 |     await expect(page.locator('h1').filter({ hasText: /Vendor/i })).toBeVisible()
  26 |     await expect(page.locator('table')).toBeVisible()
  27 |     // Seeded vendors should appear
  28 |     await expect(page.locator('td').filter({ hasText: /SnapStory|Kochi Wedding Palace/i }).first()).toBeVisible({ timeout: 10_000 })
  29 |   })
  30 | 
  31 |   test('admin vendors search filter is visible', async ({ page }) => {
  32 |     await page.goto('/admin/vendors')
> 33 |     await expect(page.getByPlaceholder(/Search vendors/i)).toBeVisible()
     |                                                            ^ Error: expect(locator).toBeVisible() failed
  34 |   })
  35 | 
  36 |   test('admin vendors pending filter shows pending tab', async ({ page }) => {
  37 |     await page.goto('/admin/vendors?status=pending')
  38 |     await expect(page.locator('h1').filter({ hasText: /Pending/i })).toBeVisible()
  39 |   })
  40 | 
  41 |   test('admin enquiries page loads with table', async ({ page }) => {
  42 |     await page.goto('/admin/enquiries')
  43 |     await expect(page.locator('h1').filter({ hasText: /Enquiries/i })).toBeVisible()
  44 |     // Status summary cards
  45 |     await expect(page.locator('text=New')).toBeVisible()
  46 |     await expect(page.locator('text=Booked')).toBeVisible()
  47 |   })
  48 | 
  49 |   test('admin revenue strip shows on dashboard', async ({ page }) => {
  50 |     await page.goto('/admin')
  51 |     await expect(page.locator('text=Monthly Revenue')).toBeVisible()
  52 |     await expect(page.locator('text=Pending Approval')).toBeVisible()
  53 |   })
  54 | 
  55 |   test('recent enquiries section on dashboard', async ({ page }) => {
  56 |     await page.goto('/admin')
  57 |     await expect(page.locator('text=Recent Enquiries')).toBeVisible()
  58 |   })
  59 | 
  60 |   test('pending approvals section on dashboard', async ({ page }) => {
  61 |     await page.goto('/admin')
  62 |     await expect(page.locator('text=Pending Approvals')).toBeVisible()
  63 |   })
  64 | 
  65 |   test('approve vendors link works from dashboard', async ({ page }) => {
  66 |     await page.goto('/admin')
  67 |     await page.getByRole('link', { name: /Approve Vendors/i }).click()
  68 |     await expect(page).toHaveURL(/\/admin\/vendors\?status=pending/)
  69 |   })
  70 | })
  71 | 
  72 | test.describe('Admin — Access Control', () => {
  73 | 
  74 |   test('non-admin cannot access admin panel', async ({ page }) => {
  75 |     // Unauthenticated visit
  76 |     await page.goto('/admin')
  77 |     await expect(page).toHaveURL(/\/admin\/login|\/admin$/)
  78 |   })
  79 | 
  80 |   test('admin login page is reachable', async ({ page }) => {
  81 |     await page.goto('/admin/login')
  82 |     await expect(page).toHaveURL(/\/admin\/login|\/admin/)
  83 |   })
  84 | })
  85 | 
```