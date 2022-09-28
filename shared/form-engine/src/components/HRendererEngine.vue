<script lang="ts">
import { defineComponent, SetupContext, PropType } from 'vue';
import type { Schema } from '/@/declarations';

import { renderSchema } from '../lib';

export default defineComponent({
  name: 'HRendererEngine',

  props: {
    modelValue: { type: [String, Number, Array, Object] },
    schemas: { type: Array as PropType<Array<Schema>>, default: () => [] }
  },

  setup(props: Record<string, any>, context: SetupContext) {
    const schemas = props.schemas as Array<Schema>;
    return () => renderSchema(schemas, props, context);
  }
});
</script>


