import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CampaignsOverview from '@/components/CampaignsOverview'
import CampaignForm from '@/components/CampaignForm'
import FindCreation from '@/components/FindForm'
import StructureCreation from '@/components/StructureForm'
import ExcavationOverview from '@/components/ExcavationOverview'
import FallbackComponent from '@/components/FallbackComponent'
import SectionCreation from '@/components/SectionForm'
import SampleCreation from "../components/SampleForm"
import ExcavationCreation from "../components/ExcavationForm"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      alias: '',
      component: Home
    },
    {
      path: '*',
      name: '404Page',
      component: FallbackComponent,
      meta: {
        title: 'Noch im Bau',
        showBackButton: true
      }
    },
    {
      path: '/campaigns',
      name: 'CampaignsOverview', // name is optional
      component: CampaignsOverview,
      meta: { // meta is optional
        title: 'Alle Projekte'
      }
    },
    {
      path: '/samples/:excavation_id/:sample_id',
      name: 'SampleCreation',
      component: SampleCreation,
      meta: {
        title: 'Probe bearbeiten'
      }
    },
    {
      path: '/sections/:excavation_id/:section_id',
      name: 'SectionCreation',
      component: SectionCreation,
      meta: {
        title: 'Schnitt anlegen'
      }
    },
    {
      path: '/structures/:excavation_id/:structure_id',
      name: 'StructureCreation',
      component: StructureCreation,
      meta: {
        title: 'Befund anlegen'
      }
    },
    {
      path: '/finds/:excavation_id/:find_id',
      name: 'FindCreation',
      component: FindCreation,
      meta: {
        title: 'Fund bearbeiten'
      }
    },
    {
      path: '/campaigns/:campaign_id',
      name: 'CampaignCreation',
      component: CampaignForm,
      meta: {
        title: 'Projekt bearbeiten'
      }
    },
    {
      path: '/excavation/:excavation_id',
      name: 'ExcavationOverview',
      component: ExcavationOverview,
      meta: {
        title: 'Ausgrabung'
      }
    },
    {
      path: '/excavation/create/:excavation_id',
      name: 'CreateExcavation',
      component: ExcavationCreation,
      meta: {
        title: 'Ausgrabung bearbeiten'
      }
    }
      /*children: [
        {
          path: 'sections',
          name: 'SectionsOverview',
          component: SectionsOverview,
          meta: {
            title: 'Schnitte'
          }
        },
        {
          path: 'samples',
          name: 'SamplesOverview',
          component: SamplesOverview,
          meta: {
            title: 'Proben'
          }
        },
        {
          path: 'finds',
          name: 'FindsOverview',
          component: FindsOverview,
          meta: {
            title: 'Funde'
          }
        },
        {
          path: 'structures',
          name: 'StructuresOverview',
          component: StructuresOverview,
          meta: {
            title: 'Befunde (SE)'
          }
        }
      ]*/
  ]
})
